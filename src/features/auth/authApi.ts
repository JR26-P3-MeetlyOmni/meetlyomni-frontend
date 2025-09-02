// api/auth.ts
import type { LoginCredentials, User } from './types';
import type { ApiError, SignupRequest, SignupResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7011/api';

// ===== Cookie & CSRF =====
function getCookie(name: string): string {
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';
  const m = window.document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return m && m[1] ? decodeURIComponent(m[1]) : '';
}

// backend Antiforgery ：options.Cookie.Name = "XSRF-TOKEN", options.HeaderName = "X-XSRF-TOKEN"
const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';

async function ensureCsrfToken(signal?: AbortSignal): Promise<string> {
  let token = getCookie(CSRF_COOKIE);
  if (!token) {
    await fetch(`${API_BASE_URL}/v1/auth/csrf`, { method: 'GET', credentials: 'include', signal });
    token = getCookie(CSRF_COOKIE);
  }
  return token;
}

// ===== Error Handling (compatible with ProblemDetails) =====
function getStringValue(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key];
  return typeof v === 'string' ? v : undefined;
}

function extractErrorMessage(errorObj: Record<string, unknown>): string | undefined {
  // RFC7807: title/detail + your custom message/error
  const messages = [
    getStringValue(errorObj, 'message'),
    getStringValue(errorObj, 'detail'),
    getStringValue(errorObj, 'title'),
    getStringValue(errorObj, 'error'),
  ].filter(Boolean);

  if (messages.length > 0) {
    return messages[0];
  }

  // compatible with ModelState: { errors: { field: [msg] } }
  return extractFromModelState(errorObj);
}

function extractFromModelState(errorObj: Record<string, unknown>): string | undefined {
  if (typeof errorObj.errors !== 'object' || !errorObj.errors) {
    return undefined;
  }

  const first = Object.values(errorObj.errors as Record<string, unknown[]>)[0] as unknown[];
  return Array.isArray(first) && typeof first[0] === 'string' ? (first[0] as string) : undefined;
}

async function handleErrorResponse(response: Response): Promise<never> {
  const text = '';
  try {
    const data = await response.json();
    const msg = extractErrorMessage(data as Record<string, unknown>);
    throw new Error(msg ?? getErrorMessageByStatus(response.status));
  } catch {
    // body is not JSON or parsing failed
    throw new Error(text || getErrorMessageByStatus(response.status));
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

// ===== User Parsing (keep your implementation) =====
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

const isValidUserData = (data: Record<string, unknown>): boolean =>
  !!(data.id && data.email) || !!(data.userId && data.email);
const createUserFromData = (data: Record<string, unknown>): User => ({
  id: String(data.id || data.userId),
  email: String(data.email),
  name: String(data.name || data.email),
});
const tryParseFromNested = (data: Record<string, unknown>, key: string): User | null => {
  const nested = data[key];
  if (nested && typeof nested === 'object' && isValidUserData(nested as Record<string, unknown>)) {
    return createUserFromData(nested as Record<string, unknown>);
  }
  return null;
};
const parseUserFromResponse = (data: Record<string, unknown>): User => {
  // Try nested user objects first
  const nestedUser = tryParseNestedUsers(data);
  if (nestedUser) return nestedUser;

  // Check if data itself is valid user data
  if (isValidUserData(data)) return createUserFromData(data);

  // Try JWT token extraction
  if (typeof data.accessToken === 'string') return extractUserFromJwt(data.accessToken);

  // Handle new response format: { userId, email, orgId, message }
  if (data.userId && data.email) {
    return createUserFromUserIdResponse(data);
  }

  // Handle token-only response
  if (data.expiresAt && data.tokenType) {
    throw new Error(
      'Response contains token info but no user data. You may need to call a separate API to get user information.',
    );
  }

  throw new Error(`Invalid response format: ${JSON.stringify(data)}`);
};

function tryParseNestedUsers(data: Record<string, unknown>): User | null {
  const keys = ['user', 'data', 'result'];
  for (const key of keys) {
    const user = tryParseFromNested(data, key);
    if (user) return user;
  }
  return null;
}

function createUserFromUserIdResponse(data: Record<string, unknown>): User {
  return {
    id: String(data.userId),
    email: String(data.email),
    name: String(data.name || data.email),
  };
}

// ===== Login API (Cookie Flow + CSRF) =====
export async function loginApi(
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<{ user: User }> {
  // 1) first ensure we get the CSRF (will plant the XSRF-TOKEN Cookie)
  const csrf = await ensureCsrfToken(signal);

  // 2) initiate login.一定要 with credentials + 带 X-XSRF-TOKEN
  const res = await fetch(`${API_BASE_URL}/v1/auth/login`, {
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

  if (!res.ok) {
    // if 400/403, it may be a credential error or CSRF expired. because we just pulled the CSRF before login, we usually don't retry here.
    return handleErrorResponse(res);
  }

  const data = (await res.json()) as Record<string, unknown>;

  // if the response only contains token information, we need to call the API to get user information
  if (data.expiresAt && data.tokenType && !data.user && !data.accessToken) {
    const userResponse = await getCurrentUserApi(signal);
    return userResponse;
  }

  const user = parseUserFromResponse(data);
  return { user };
}

// ===== Get Current User Information API =====
export async function getCurrentUserApi(signal?: AbortSignal): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE_URL}/v1/auth/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  if (!res.ok) {
    return handleErrorResponse(res);
  }

  const data = (await res.json()) as Record<string, unknown>;
  const user = parseUserFromResponse(data);

  return { user };
}

/**
 * Signup API function
 * @param signupData - The signup form data
 * @returns Promise with signup response or error
 */
function createTimeoutController(): { controller: AbortController; timeout: NodeJS.Timeout } {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  return { controller, timeout };
}

function parseResponseData(text: string): {
  message?: string;
  error?: string;
  data?: { userId: string; companyId: string };
} {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

function handleApiError(error: unknown): ApiError {
  const isAbort =
    typeof error === 'object' &&
    error !== null &&
    (error as Error & { name?: string }).name === 'AbortError';
  return {
    success: false,
    message: isAbort
      ? 'Request timed out. Please try again.'
      : 'Network error occurred. Please try again.',
    error: error instanceof Error ? error.message : 'Unknown error',
  };
}

export async function signup(signupData: SignupRequest): Promise<SignupResponse | ApiError> {
  try {
    if (!API_BASE_URL) {
      return {
        success: false,
        message: 'Signup is temporarily unavailable due to configuration. Please try again later.',
        error: 'Missing NEXT_PUBLIC_API_BASE_URL',
      };
    }

    const { controller, timeout } = createTimeoutController();
    const response = await fetch(`${API_BASE_URL}/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
      // credentials: 'include', // uncomment if server uses cookies
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const text = await response.text();
    const data = parseResponseData(text);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Signup failed',
        error: data.error,
      };
    }

    return {
      success: true,
      message: data.message || 'Signup successful',
      data: data.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
}
