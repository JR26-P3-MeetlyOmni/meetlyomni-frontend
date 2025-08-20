import type { LoginCredentials, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const loginApi = async (credentials: LoginCredentials): Promise<{ user: User }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      message = err?.error || message;
    } catch {
      // ignore JSON parse errors, keep status message
    }
    console.error('[loginApi] failed', response.status, message);
    throw new Error(message);
  }

  return response.json();
};