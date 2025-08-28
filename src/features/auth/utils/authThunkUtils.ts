import type { RootState } from '@/store/store';

import type { AuthError } from '../types';

export const isAbortError = (error: unknown): error is Error => {
  return error instanceof Error && error.name === 'AbortError';
};

export const toAuthError = (
  error: unknown,
  fallbackMessage: string,
  fallbackCode: string,
): AuthError => {
  if (isAbortError(error)) {
    return { message: 'Request aborted', code: 'ABORTED' };
  }
  return {
    message: error instanceof Error ? error.message : fallbackMessage,
    code: fallbackCode,
  };
};

// Concurrency guards
export const canLogin = (state: RootState): boolean => {
  return !state.auth.isLoading && !state.auth.isAuthenticated;
};

export const canRequestPasswordReset = (state: RootState): boolean => {
  return !state.auth.passwordReset.isRequestingReset;
};

export const canResetPassword = (state: RootState): boolean => {
  return !state.auth.passwordReset.isResettingPassword;
};
