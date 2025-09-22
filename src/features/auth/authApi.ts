import type { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7011/api';
const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';
function getCookie(name: string): string {
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
  const match = window.document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'),
  );
  return match ? decodeURIComponent(match[1] || '') : '';
}

async function ensureCsrfToken(signal?: AbortSignal): Promise<string> {
  let token = getCookie(CSRF_COOKIE);

  if (!token) {
    try {
      token = await getCsrfTokenApi(signal);
    } catch {
      throw new Error('Unable to obtain CSRF token for authentication');
    }
  }

  return token;
}
function extractErrorMessage(errorObj: Record<string, unknown>): string | undefined {
  const message = errorObj.message || errorObj.detail || errorObj.title || errorObj.error;
  if (typeof message === 'string') return message;

  if (errorObj.errors && typeof errorObj.errors === 'object') {
    const firstError = Object.values(errorObj.errors as Record<string, unknown[]>)[0];
    if (Array.isArray(firstError) && typeof firstError[0] === 'string') {
      return firstError[0];
    }
  }

  return undefined;
}

async function handleErrorResponse(response: Response): Promise<never> {
  try {
    const data = await response.json();
    const message = extractErrorMessage(data as Record<string, unknown>);
    throw new Error(message || getErrorMessageByStatus(response.status));
  } catch (error) {
    if (error instanceof Error && error.message !== 'Unexpected end of JSON input') {
      throw error;
    }
    throw new Error(getErrorMessageByStatus(response.status));
  }
}

function getErrorMessageByStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Bad request';
    case 401:
      return 'Invalid username or password';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not found';
    case 500:
      return 'Server error, please try again later';
    default:
      return `Request failed (status: ${status})`;
  }
}

const extractUserFromJwt = (accessToken: string): User => {
  const parts = accessToken.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT token format');

  try {
    const payload = JSON.parse(atob(parts[1] || ''));
    return {
      id: String(payload.sub || payload.userId || ''),
      email: String(payload.email || ''),
      name: String(payload.name || payload.userName || payload.email || ''),
    };
  } catch {
    throw new Error('Invalid JWT token format');
  }
};

const createUserFromData = (data: Record<string, unknown>): User => ({
  id: String(data.id || data.userId),
  email: String(data.email),
  name: String(data.name || data.email),
});

const isValidUserData = (data: Record<string, unknown>): boolean =>
  !!((data.id || data.userId) && data.email);
const parseUserFromResponse = (data: Record<string, unknown>): User => {
  // Try nested user objects
  for (const key of ['user', 'data', 'result']) {
    const nested = data[key];
    if (
      nested &&
      typeof nested === 'object' &&
      isValidUserData(nested as Record<string, unknown>)
    ) {
      return createUserFromData(nested as Record<string, unknown>);
    }
  }

  // Check if data itself is valid user data
  if (isValidUserData(data)) return createUserFromData(data);

  // Try JWT token extraction
  if (typeof data.accessToken === 'string') return extractUserFromJwt(data.accessToken);

  // Handle token-only response
  if (data.expiresAt && data.tokenType) {
    throw new Error(
      'Response contains token info but no user data. You may need to call a separate API to get user information.',
    );
  }

  throw new Error(`Invalid response format: ${JSON.stringify(data)}`);
};

export async function getCsrfTokenApi(signal?: AbortSignal): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/v1/auth/csrf`, {
    method: 'GET',
    credentials: 'include',
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`CSRF token request failed: ${response.status} ${response.statusText}`);
  }

  const token = getCookie(CSRF_COOKIE);
  if (!token) {
    throw new Error('CSRF token not found in cookies after request');
  }

  return token;
}

export async function loginApi(
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<{ user: User }> {
  const csrf = await ensureCsrfToken(signal);

  const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      [CSRF_HEADER]: csrf,
    },
    body: JSON.stringify(credentials),
    signal,
  });

  if (!response.ok) {
    return handleErrorResponse(response);
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (data.expiresAt && data.tokenType && !data.user && !data.accessToken) {
    return getCurrentUserApi(signal);
  }

  const user = parseUserFromResponse(data);
  return { user };
}

export async function getCurrentUserApi(signal?: AbortSignal): Promise<{ user: User }> {
  const response = await fetch(`${API_BASE_URL}/v1/auth/me`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    return handleErrorResponse(response);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const user = parseUserFromResponse(data);
  return { user };
}

export async function logoutApi(signal?: AbortSignal): Promise<void> {
  const csrf = await ensureCsrfToken(signal);

  await fetch(`${API_BASE_URL}/v1/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      [CSRF_HEADER]: csrf,
    },
    signal,
  });
}
