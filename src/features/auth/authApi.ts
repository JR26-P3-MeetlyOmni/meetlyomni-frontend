import type { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const loginApi = async (
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<{ user: User }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    signal,
  });

  if (!response.ok) {
    let errorMessage: string;
    try {
      const err = await response.json();

      //Harden JSON error extraction to avoid “[object Object]” messages
      const msg = typeof err?.message === 'string' ? err.message : undefined;
      const errStr = typeof err?.error === 'string' ? err.error : undefined;

      const jsonStr = (() => {
        try {
          return JSON.stringify(err);
        } catch {
          return undefined;
        }
      })();

      errorMessage = msg ?? errStr ?? jsonStr ?? getErrorMessageByStatus(response.status);
    } catch {
      errorMessage = getErrorMessageByStatus(response.status);
    }
    throw new Error(errorMessage);
  }

  return response.json();
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
