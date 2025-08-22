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
      errorMessage = err?.message || err?.error || getErrorMessageByStatus(response.status);
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
      return 'this is fronend 401';
    case 500:
      return 'Server error, please try again later';
    default:
      return `Login failed (error code: ${status})`;
  }
}
