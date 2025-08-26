import type { RequestResetCredentials } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const requestResetApi = async (
  credentials: RequestResetCredentials,
  signal?: AbortSignal,
): Promise<{ ok: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/auth/request-reset`, {
    method: 'POST',
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
      
      // Harden JSON error extraction to avoid "[object Object]" messages
      const msg = typeof err?.message === 'string' ? err.message : undefined;
      const errStr = typeof err?.error === 'string' ? err.error : undefined;

      const jsonStr = (() => {
        try {
          return JSON.stringify(err);
        } catch {
          return undefined;
        }
      })();

      errorMessage = msg ?? errStr ?? jsonStr ?? 'Password reset request failed';
    } catch {
      errorMessage = 'Unable to process request. Please try again.';
    }
    throw new Error(errorMessage);
  }

  return response.json();
};