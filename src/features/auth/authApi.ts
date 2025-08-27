import type { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7011/api';

// Token处理工具函数
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to parse JWT payload:', error);
    throw new Error('Invalid JWT token format');
  }
};

// Helper function to parse user from response data
// eslint-disable-next-line complexity
const parseUserFromResponse = (data: Record<string, unknown>): User => {
  // Format 1: { user: User }
  if (data.user && typeof data.user === 'object') {
    const userObj = data.user as Record<string, unknown>;
    if (userObj.id && userObj.email) {
      return {
        id: String(userObj.id),
        email: String(userObj.email),
        name: String(userObj.name || userObj.email),
      };
    }
  }

  // Format 2: Directly return user object { id, email, name }
  if (data.id && data.email) {
    return {
      id: String(data.id),
      email: String(data.email),
      name: String(data.name || data.email),
    };
  }

  // Format 3: { data: User } or other possible formats
  if (data.data && typeof data.data === 'object') {
    const dataObj = data.data as Record<string, unknown>;
    if (dataObj.id && dataObj.email) {
      return {
        id: String(dataObj.id),
        email: String(dataObj.email),
        name: String(dataObj.name || dataObj.email),
      };
    }
  }

  // Format 4: { result: User } or other possible formats
  if (data.result && typeof data.result === 'object') {
    const resultObj = data.result as Record<string, unknown>;
    if (resultObj.id && resultObj.email) {
      return {
        id: String(resultObj.id),
        email: String(resultObj.email),
        name: String(resultObj.name || resultObj.email),
      };
    }
  }

  // Format 5: Only token response, extract user information from JWT
  if (data.accessToken && typeof data.accessToken === 'string') {
    return extractUserFromJwt(data.accessToken);
  }

  // eslint-disable-next-line no-console
  console.error('Unexpected response format:', data);
  // eslint-disable-next-line no-console
  console.error('Response keys:', Object.keys(data));
  throw new Error(
    `Invalid response format from server. Expected user object or accessToken, got: ${JSON.stringify(data)}`,
  );
};

// Helper function to handle error response
// eslint-disable-next-line complexity
const handleErrorResponse = async (response: Response): Promise<never> => {
  let errorMessage: string;
  let errorData: unknown = null;

  try {
    errorData = await response.json();
    // eslint-disable-next-line no-console
    console.log('Error response data:', errorData);

    //Harden JSON error extraction to avoid "[object Object]" messages
    const errorObj = errorData as Record<string, unknown>;
    const msg = typeof errorObj?.message === 'string' ? errorObj.message : undefined;
    const errStr = typeof errorObj?.error === 'string' ? errorObj.error : undefined;
    const detail = typeof errorObj?.detail === 'string' ? errorObj.detail : undefined;
    const title = typeof errorObj?.title === 'string' ? errorObj.title : undefined;

    const jsonStr = (() => {
      try {
        return JSON.stringify(errorData);
      } catch {
        return undefined;
      }
    })();

    errorMessage =
      msg ?? detail ?? title ?? errStr ?? jsonStr ?? getErrorMessageByStatus(response.status);
  } catch (parseError) {
    // eslint-disable-next-line no-console
    console.log('Failed to parse error response:', parseError);
    errorMessage = getErrorMessageByStatus(response.status);
  }

  // eslint-disable-next-line no-console
  console.log('Final error message:', errorMessage);
  throw new Error(errorMessage);
};

export const loginApi = async (
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<{ user: User }> => {
  // eslint-disable-next-line no-console
  console.log('Attempting login to:', `${API_BASE_URL}/Login`);
  // eslint-disable-next-line no-console
  console.log('Request payload:', credentials);

  try {
    const response = await fetch(`${API_BASE_URL}/Login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials),
      signal,
    });

    // eslint-disable-next-line no-console
    console.log('Response status:', response.status);
    // eslint-disable-next-line no-console
    console.log(
      'Response headers:',
      response.headers ? Object.fromEntries(response.headers.entries()) : 'No headers',
    );

    if (!response.ok) {
      return handleErrorResponse(response);
    }

    const data = await response.json();
    // eslint-disable-next-line no-console
    console.log('Success response data:', data);

    const user = parseUserFromResponse(data);

    // If the backend returns a token, store it
    if (data.token || data.accessToken || data.jwt) {
      const token = data.token || data.accessToken || data.jwt;
      setAuthToken(token);
    }

    return { user };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Network or parsing error:', error);
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
