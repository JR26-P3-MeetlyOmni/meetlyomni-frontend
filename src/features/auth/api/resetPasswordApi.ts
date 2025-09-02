import type { ResetPasswordCredentials } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * Resets password using the provided token and new password
 */
export const resetPasswordApi = async (
  credentials: ResetPasswordCredentials,
  signal?: AbortSignal,
): Promise<{ ok: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
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

      errorMessage = msg ?? errStr ?? jsonStr ?? 'Password reset failed';
    } catch {
      errorMessage = 'Unable to reset password. Please try again.';
    }
    throw new Error(errorMessage);
  }

  return response.json();
};