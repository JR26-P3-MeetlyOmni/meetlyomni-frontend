import { describe, expect, it } from 'vitest';

import authReducer, { clearPasswordResetState, clearPasswordResetErrors } from '../slice';
import { loginThunk } from '../thunks/loginThunk';
import { requestResetThunk } from '../thunks/requestResetThunk';
import { resetPasswordThunk } from '../thunks/resetPasswordThunk';
import type { AuthState, User } from '../types';

describe('auth slice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    passwordReset: {
      emailSent: false,
      isRequestingReset: false,
      isResettingPassword: false,
      requestError: null,
      resetError: null,
    },
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  describe('initial state', () => {
    it('should return the initial state when passed undefined', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should return the initial state when passed unknown action', () => {
      const previousState = { ...initialState, user: mockUser };
      expect(authReducer(previousState, { type: 'unknown' })).toEqual(previousState);
    });
  });

  describe('reducers', () => {
    describe('clearPasswordResetState', () => {
      it('should reset password reset state to initial values', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: true,
            isResettingPassword: true,
            requestError: 'Request error',
            resetError: 'Reset error',
          },
        };

        const newState = authReducer(previousState, clearPasswordResetState());

        expect(newState.passwordReset).toEqual(initialState.passwordReset);
        expect(newState.passwordReset.emailSent).toBe(false);
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.isResettingPassword).toBe(false);
        expect(newState.passwordReset.requestError).toBe(null);
        expect(newState.passwordReset.resetError).toBe(null);
      });
    });

    describe('clearPasswordResetErrors', () => {
      it('should clear only password reset errors', () => {
        const previousState: AuthState = {
          ...initialState,
          error: 'Main error',
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: false,
            requestError: 'Request error',
            resetError: 'Reset error',
          },
        };

        const newState = authReducer(previousState, clearPasswordResetErrors());

        expect(newState.passwordReset.requestError).toBe(null);
        expect(newState.passwordReset.resetError).toBe(null);
        expect(newState.error).toBe('Main error'); // Should not be cleared
        expect(newState.passwordReset.emailSent).toBe(true); // Should not be cleared
      });
    });
  });

  describe('loginThunk', () => {
    describe('loginThunk.pending', () => {
      it('should set loading to true and clear error', () => {
        const previousState: AuthState = {
          ...initialState,
          error: 'Previous error',
        };

        const action = loginThunk.pending('requestId', {
          email: 'test@example.com',
          password: 'password',
        });
        const newState = authReducer(previousState, action);

        expect(newState.isLoading).toBe(true);
        expect(newState.error).toBe(null);
        expect(newState.user).toBe(null);
        expect(newState.isAuthenticated).toBe(false);
      });
    });

    describe('loginThunk.fulfilled', () => {
      it('should set user, authenticated to true, and loading to false', () => {
        const previousState: AuthState = {
          ...initialState,
          isLoading: true,
          error: 'Some error',
        };

        const action = loginThunk.fulfilled(mockUser, 'requestId', {
          email: 'test@example.com',
          password: 'password',
        });
        const newState = authReducer(previousState, action);

        expect(newState.user).toEqual(mockUser);
        expect(newState.isAuthenticated).toBe(true);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toBe(null);
      });
    });

    describe('loginThunk.rejected', () => {
      it('should set error from payload message and stop loading', () => {
        const previousState: AuthState = {
          ...initialState,
          isLoading: true,
          user: mockUser,
          isAuthenticated: true,
        };

        const action = loginThunk.rejected(
          { message: 'Login failed from payload' } as any,
          'requestId',
          { email: 'test@example.com', password: 'password' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.error).toBe('Login failed from payload');
        expect(newState.isLoading).toBe(false);
        expect(newState.user).toBe(null);
        expect(newState.isAuthenticated).toBe(false);
      });

      it('should set error from error message when payload is not available', () => {
        const previousState: AuthState = {
          ...initialState,
          isLoading: true,
          user: mockUser,
          isAuthenticated: true,
        };

        const error = new Error('Login failed from error');
        const action = loginThunk.rejected(error, 'requestId', {
          email: 'test@example.com',
          password: 'password',
        });
        const newState = authReducer(previousState, action);

        expect(newState.error).toBe('Login failed from error');
        expect(newState.isLoading).toBe(false);
        expect(newState.user).toBe(null);
        expect(newState.isAuthenticated).toBe(false);
      });

      it('should set default error message when neither payload nor error message is available', () => {
        const previousState: AuthState = {
          ...initialState,
          isLoading: true,
          user: mockUser,
          isAuthenticated: true,
        };

        const action = loginThunk.rejected(
          {} as any,
          'requestId',
          { email: 'test@example.com', password: 'password' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.error).toBe('Login failed');
        expect(newState.isLoading).toBe(false);
        expect(newState.user).toBe(null);
        expect(newState.isAuthenticated).toBe(false);
      });
    });
  });

  describe('requestResetThunk', () => {
    describe('requestResetThunk.pending', () => {
      it('should set isRequestingReset to true and clear errors', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: false,
            requestError: 'Previous error',
            resetError: null,
          },
        };

        const action = requestResetThunk.pending('requestId', { email: 'test@example.com' });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.isRequestingReset).toBe(true);
        expect(newState.passwordReset.requestError).toBe(null);
        expect(newState.passwordReset.emailSent).toBe(false);
        expect(newState.passwordReset.isResettingPassword).toBe(false);
      });
    });

    describe('requestResetThunk.fulfilled', () => {
      it('should set emailSent to true and stop requesting', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: false,
            isRequestingReset: true,
            isResettingPassword: false,
            requestError: 'Some error',
            resetError: null,
          },
        };

        const action = requestResetThunk.fulfilled(true, 'requestId', { email: 'test@example.com' });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.emailSent).toBe(true);
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.requestError).toBe(null);
        expect(newState.passwordReset.isResettingPassword).toBe(false);
      });
    });

    describe('requestResetThunk.rejected', () => {
      it('should set error from payload message', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: true,
            isResettingPassword: false,
            requestError: null,
            resetError: null,
          },
        };

        const action = requestResetThunk.rejected(
          { message: 'Email not found' } as any,
          'requestId',
          { email: 'test@example.com' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.requestError).toBe('Email not found');
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.emailSent).toBe(false);
      });

      it('should set error from error message when payload is not available', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: true,
            isResettingPassword: false,
            requestError: null,
            resetError: null,
          },
        };

        const error = new Error('Network error');
        const action = requestResetThunk.rejected(error, 'requestId', { email: 'test@example.com' });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.requestError).toBe('Network error');
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.emailSent).toBe(false);
      });

      it('should set default error message when neither payload nor error message is available', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: true,
            isResettingPassword: false,
            requestError: null,
            resetError: null,
          },
        };

        const action = requestResetThunk.rejected(
          {} as any,
          'requestId',
          { email: 'test@example.com' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.requestError).toBe('Password reset request failed');
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.emailSent).toBe(false);
      });
    });
  });

  describe('resetPasswordThunk', () => {
    describe('resetPasswordThunk.pending', () => {
      it('should set isResettingPassword to true and clear reset error', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: false,
            requestError: null,
            resetError: 'Previous error',
          },
        };

        const action = resetPasswordThunk.pending('requestId', {
          token: 'valid-token',
          newPassword: 'NewPassword123!',
        });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.isResettingPassword).toBe(true);
        expect(newState.passwordReset.resetError).toBe(null);
        expect(newState.passwordReset.isRequestingReset).toBe(false);
      });
    });

    describe('resetPasswordThunk.fulfilled', () => {
      it('should reset password reset state to initial values', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: true,
            requestError: 'Some error',
            resetError: 'Some error',
          },
        };

        const action = resetPasswordThunk.fulfilled(true, 'requestId', {
          token: 'valid-token',
          newPassword: 'NewPassword123!',
        });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset).toEqual(initialState.passwordReset);
        expect(newState.passwordReset.emailSent).toBe(false);
        expect(newState.passwordReset.isRequestingReset).toBe(false);
        expect(newState.passwordReset.isResettingPassword).toBe(false);
        expect(newState.passwordReset.requestError).toBe(null);
        expect(newState.passwordReset.resetError).toBe(null);
      });
    });

    describe('resetPasswordThunk.rejected', () => {
      it('should set error from payload message', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: true,
            requestError: null,
            resetError: null,
          },
        };

        const action = resetPasswordThunk.rejected(
          { message: 'Invalid token' } as any,
          'requestId',
          { token: 'invalid-token', newPassword: 'NewPassword123!' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.resetError).toBe('Invalid token');
        expect(newState.passwordReset.isResettingPassword).toBe(false);
        expect(newState.passwordReset.emailSent).toBe(true); // Should not be reset
      });

      it('should set error from error message when payload is not available', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: true,
            requestError: null,
            resetError: null,
          },
        };

        const error = new Error('Token expired');
        const action = resetPasswordThunk.rejected(error, 'requestId', {
          token: 'expired-token',
          newPassword: 'NewPassword123!',
        });
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.resetError).toBe('Token expired');
        expect(newState.passwordReset.isResettingPassword).toBe(false);
      });

      it('should set default error message when neither payload nor error message is available', () => {
        const previousState: AuthState = {
          ...initialState,
          passwordReset: {
            emailSent: true,
            isRequestingReset: false,
            isResettingPassword: true,
            requestError: null,
            resetError: null,
          },
        };

        const action = resetPasswordThunk.rejected(
          {} as any,
          'requestId',
          { token: 'valid-token', newPassword: 'NewPassword123!' },
        );
        const newState = authReducer(previousState, action);

        expect(newState.passwordReset.resetError).toBe('Password reset failed');
        expect(newState.passwordReset.isResettingPassword).toBe(false);
      });
    });
  });

  describe('thunk action types', () => {
    it('should have correct login thunk action types', () => {
      expect(loginThunk.pending.type).toBe('auth/login/pending');
      expect(loginThunk.fulfilled.type).toBe('auth/login/fulfilled');
      expect(loginThunk.rejected.type).toBe('auth/login/rejected');
    });

    it('should have correct request reset thunk action types', () => {
      expect(requestResetThunk.pending.type).toBe('auth/requestReset/pending');
      expect(requestResetThunk.fulfilled.type).toBe('auth/requestReset/fulfilled');
      expect(requestResetThunk.rejected.type).toBe('auth/requestReset/rejected');
    });

    it('should have correct reset password thunk action types', () => {
      expect(resetPasswordThunk.pending.type).toBe('auth/resetPassword/pending');
      expect(resetPasswordThunk.fulfilled.type).toBe('auth/resetPassword/fulfilled');
      expect(resetPasswordThunk.rejected.type).toBe('auth/resetPassword/rejected');
    });
  });

  describe('state immutability', () => {
    it('should not mutate the previous state', () => {
      const previousState: AuthState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        passwordReset: {
          emailSent: true,
          isRequestingReset: false,
          isResettingPassword: false,
          requestError: 'Test error',
          resetError: null,
        },
      };

      const action = loginThunk.pending('requestId', {
        email: 'test@example.com',
        password: 'password',
      });

      const newState = authReducer(previousState, action);

      // Original state should not be mutated
      expect(previousState.user).toEqual(mockUser);
      expect(previousState.isAuthenticated).toBe(true);
      expect(previousState.passwordReset.emailSent).toBe(true);
      expect(previousState.passwordReset.requestError).toBe('Test error');

      // New state should be different - loginThunk.pending only sets loading and clears error
      expect(newState.user).toEqual(mockUser); // User is not reset in pending
      expect(newState.isAuthenticated).toBe(true); // Authentication is not reset in pending
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });

    it('should properly reset state in loginThunk.rejected', () => {
      const previousState: AuthState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        isLoading: true,
        passwordReset: {
          emailSent: true,
          isRequestingReset: false,
          isResettingPassword: false,
          requestError: 'Test error',
          resetError: null,
        },
      };

      const action = loginThunk.rejected(
        new Error('Login failed'),
        'requestId',
        { email: 'test@example.com', password: 'password' },
      );

      const newState = authReducer(previousState, action);

      // Original state should not be mutated
      expect(previousState.user).toEqual(mockUser);
      expect(previousState.isAuthenticated).toBe(true);

      // New state should be reset
      expect(newState.user).toBe(null);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Login failed');
    });
  });
});
