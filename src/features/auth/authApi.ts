import type { ApiError, SignupRequest, SignupResponse } from './types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV !== 'production'
    ? 'https://localhost:7011'
    : (() => {
        throw new Error('NEXT_PUBLIC_API_BASE_URL must be defined in production');
      })());

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
