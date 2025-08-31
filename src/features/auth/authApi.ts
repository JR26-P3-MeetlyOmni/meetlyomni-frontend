import type { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7011/api';

// Token management functions
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// Helper function to extract user from JWT token
const extractUserFromJwt = (accessToken: string): User => {
  const tokenParts = accessToken.split('.');
  if (tokenParts.length !== 3) {
    throw new Error('Invalid JWT token format');
  }

  try {
    const payload = JSON.parse(atob(tokenParts[1] || ''));
    return {
      id: String(payload.sub || payload.userId || ''),
      email: String(payload.email || ''),
      name: String(payload.name || payload.userName || payload.email || ''),
    };
  } catch {
    throw new Error('Invalid JWT token format');
  }
};

// Helper function to create user object from data
const createUserFromData = (data: Record<string, unknown>): User => ({
  id: String(data.id),
  email: String(data.email),
  name: String(data.name || data.email),
});

// Helper function to validate user data
const isValidUserData = (data: Record<string, unknown>): boolean => {
  return !!(data.id && data.email);
};

// Helper function to try parsing user from nested object
const tryParseFromNested = (data: Record<string, unknown>, key: string): User | null => {
  const nested = data[key];
  if (nested && typeof nested === 'object') {
    const nestedObj = nested as Record<string, unknown>;
    if (isValidUserData(nestedObj)) {
      return createUserFromData(nestedObj);
    }
  }
  return null;
};

// Helper function to parse user from response data
const parseUserFromResponse = (data: Record<string, unknown>): User => {
  // Format 1: { user: User }
  const userFromUser = tryParseFromNested(data, 'user');
  if (userFromUser) return userFromUser;

  // Format 2: Directly return user object { id, email, name }
  if (isValidUserData(data)) {
    return createUserFromData(data);
  }

  // Format 3: { data: User }
  const userFromData = tryParseFromNested(data, 'data');
  if (userFromData) return userFromData;

  // Format 4: { result: User }
  const userFromResult = tryParseFromNested(data, 'result');
  if (userFromResult) return userFromResult;

  // Format 5: Only token response, extract user information from JWT
  if (data.accessToken && typeof data.accessToken === 'string') {
    return extractUserFromJwt(data.accessToken);
  }

  throw new Error(
    `Invalid response format from server. Expected user object or accessToken, got: ${JSON.stringify(data)}`,
  );
};

// Helper function to safely get string value from object
const getStringValue = (obj: Record<string, unknown>, key: string): string | undefined => {
  const value = obj[key];
  return typeof value === 'string' ? value : undefined;
};

// Helper function to extract error message from error object
const extractErrorMessage = (errorObj: Record<string, unknown>): string | undefined => {
  const msg = getStringValue(errorObj, 'message');
  const errStr = getStringValue(errorObj, 'error');
  const detail = getStringValue(errorObj, 'detail');
  const title = getStringValue(errorObj, 'title');

  return msg ?? detail ?? title ?? errStr;
};

// Helper function to handle error response
const handleErrorResponse = async (response: Response): Promise<never> => {
  let errorMessage: string;

  try {
    const errorData = await response.json();
    const errorObj = errorData as Record<string, unknown>;
    errorMessage = extractErrorMessage(errorObj) ?? getErrorMessageByStatus(response.status);
  } catch {
    errorMessage = getErrorMessageByStatus(response.status);
  }

  throw new Error(errorMessage);
};

export const loginApi = async (
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<{ user: User }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
      signal,
    });

    if (!response.ok) {
      return handleErrorResponse(response);
    }

    const data = await response.json();
    const user = parseUserFromResponse(data);

    // If the backend returns a token, store it
    if (data.token || data.accessToken || data.jwt) {
      const token = data.token || data.accessToken || data.jwt;
      setAuthToken(token);
    }

    return { user };
  } catch (error) {
    // Re-throw the error to be handled by the thunk
    throw error;
  }
};

function getErrorMessageByStatus(status: number): string {
  switch (status) {
    case 401:
      return 'Invalid username or password, please try again';
    case 500:
      return 'Server error, please try again later';
    default:
      return `Login failed (error code: ${status})`;
  }
}
