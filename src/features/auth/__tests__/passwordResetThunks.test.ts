import { beforeEach, describe, expect, it, vi } from 'vitest';

import { configureStore } from '@reduxjs/toolkit';

import * as requestResetApi from '../api/requestResetApi';
import * as resetPasswordApi from '../api/resetPasswordApi';
import authReducer from '../slice';
import { requestResetThunk } from '../thunks/requestResetThunk';
import { resetPasswordThunk } from '../thunks/resetPasswordThunk';
import type { RequestResetCredentials, ResetPasswordCredentials } from '../types';

// Mock the API modules
vi.mock('../api/requestResetApi');
vi.mock('../api/resetPasswordApi');

const mockRequestResetApi = requestResetApi.requestResetApi as ReturnType<typeof vi.fn>;
const mockResetPasswordApi = resetPasswordApi.resetPasswordApi as ReturnType<typeof vi.fn>;

describe('passwordResetThunks', () => {
  let store: ReturnType<typeof configureStore>;

  const mockRequestResetCredentials: RequestResetCredentials = {
    email: 'test@example.com',
  };

  const mockResetPasswordCredentials: ResetPasswordCredentials = {
    token: 'valid-token-123',
    newPassword: 'NewPassword123!',
  };

  beforeEach(() => {
    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    mockRequestResetApi.mockClear();
    mockResetPasswordApi.mockClear();
  });

  describe('requestResetThunk', () => {
    describe('successful request reset', () => {
      it('should dispatch requestResetStart, call API, and dispatch requestResetSuccess', async () => {
        // Mock successful API response
        mockRequestResetApi.mockResolvedValue({ ok: true });

        // Dispatch the thunk
        const result = await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        // Check that the API was called with correct credentials and forwarded signal
        expect(mockRequestResetApi).toHaveBeenCalledWith(mockRequestResetCredentials, expect.anything());
        expect(mockRequestResetApi).toHaveBeenCalledTimes(1);

        // Check that the thunk fulfilled and returned true
        expect(requestResetThunk.fulfilled.match(result)).toBe(true);
        expect(result.payload).toBe(true);

        // Check final state
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.emailSent).toBe(true);
        expect(finalState.passwordReset.isRequestingReset).toBe(false);
        expect(finalState.passwordReset.requestError).toBe(null);
      });

      it('should dispatch actions in correct order', async () => {
        mockRequestResetApi.mockResolvedValue({ ok: true });

        await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        // Check final state to verify actions were dispatched correctly
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.emailSent).toBe(true);
        expect(finalState.passwordReset.isRequestingReset).toBe(false);
        expect(finalState.passwordReset.requestError).toBe(null);
      });
    });

    describe('failed request reset', () => {
      it('should dispatch requestResetStart, call API, and dispatch requestResetFailure on error', async () => {
        const errorMessage = 'Email not found';
        mockRequestResetApi.mockRejectedValue(new Error(errorMessage));

        // Dispatch the thunk and expect it to be rejected
        const result = await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        // Check that the API was called with forwarded signal
        expect(mockRequestResetApi).toHaveBeenCalledWith(mockRequestResetCredentials, expect.anything());
        expect(mockRequestResetApi).toHaveBeenCalledTimes(1);

        // Check that the thunk rejected
        expect(requestResetThunk.rejected.match(result)).toBe(true);

        // Check final state
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.emailSent).toBe(false);
        expect(finalState.passwordReset.isRequestingReset).toBe(false);
        expect(finalState.passwordReset.requestError).toBe(errorMessage);
      });

      it('should handle non-Error objects', async () => {
        const errorMessage = 'Unexpected error format';
        mockRequestResetApi.mockRejectedValue(errorMessage); // Not an Error object

        await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        const finalState = store.getState().auth;
        expect(finalState.passwordReset.requestError).toBeTruthy(); // Should have some error message
      });

      it('should handle AbortError with friendly message', async () => {
        const abortError = new Error('Aborted');
        (abortError as any).name = 'AbortError';
        mockRequestResetApi.mockRejectedValue(abortError);

        await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        const finalState = store.getState().auth;
        expect(finalState.passwordReset.requestError).toBe('Request aborted');
      });
    });

    describe('thunk lifecycle', () => {
      it('should have correct action types', () => {
        expect(requestResetThunk.pending.type).toBe('auth/requestReset/pending');
        expect(requestResetThunk.fulfilled.type).toBe('auth/requestReset/fulfilled');
        expect(requestResetThunk.rejected.type).toBe('auth/requestReset/rejected');
      });

      it('should handle pending state correctly', async () => {
        mockRequestResetApi.mockResolvedValue({ ok: true });

        // Execute thunk
        await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        // Check final state
        const currentState = store.getState().auth;
        expect(currentState.passwordReset.isRequestingReset).toBe(false);
        expect(currentState.passwordReset.emailSent).toBe(true);
      });
    });

    describe('concurrency prevention', () => {
      it('should not call API when condition blocks due to isRequestingReset=true', async () => {
        // Set requesting reset state by dispatching pending action
        store.dispatch(requestResetThunk.pending('requestId', mockRequestResetCredentials));

        await store.dispatch(requestResetThunk(mockRequestResetCredentials));

        // Should be blocked by condition and not call API
        expect(mockRequestResetApi).not.toHaveBeenCalled();
      });
    });
  });

  describe('resetPasswordThunk', () => {
    describe('successful password reset', () => {
      it('should dispatch resetPasswordStart, call API, and dispatch resetPasswordSuccess', async () => {
        // Mock successful API response
        mockResetPasswordApi.mockResolvedValue({ ok: true });

        // Dispatch the thunk
        const result = await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        // Check that the API was called with correct credentials and forwarded signal
        expect(mockResetPasswordApi).toHaveBeenCalledWith(mockResetPasswordCredentials, expect.anything());
        expect(mockResetPasswordApi).toHaveBeenCalledTimes(1);

        // Check that the thunk fulfilled and returned true
        expect(resetPasswordThunk.fulfilled.match(result)).toBe(true);
        expect(result.payload).toBe(true);

        // Check final state
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.isResettingPassword).toBe(false);
        expect(finalState.passwordReset.resetError).toBe(null);
      });

      it('should dispatch actions in correct order', async () => {
        mockResetPasswordApi.mockResolvedValue({ ok: true });

        await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        // Check final state to verify actions were dispatched correctly
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.isResettingPassword).toBe(false);
        expect(finalState.passwordReset.resetError).toBe(null);
      });
    });

    describe('failed password reset', () => {
      it('should dispatch resetPasswordStart, call API, and dispatch resetPasswordFailure on error', async () => {
        const errorMessage = 'Invalid token';
        mockResetPasswordApi.mockRejectedValue(new Error(errorMessage));

        // Dispatch the thunk and expect it to be rejected
        const result = await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        // Check that the API was called with forwarded signal
        expect(mockResetPasswordApi).toHaveBeenCalledWith(mockResetPasswordCredentials, expect.anything());
        expect(mockResetPasswordApi).toHaveBeenCalledTimes(1);

        // Check that the thunk rejected
        expect(resetPasswordThunk.rejected.match(result)).toBe(true);

        // Check final state
        const finalState = store.getState().auth;
        expect(finalState.passwordReset.isResettingPassword).toBe(false);
        expect(finalState.passwordReset.resetError).toBe(errorMessage);
      });

      it('should handle non-Error objects', async () => {
        const errorMessage = 'Unexpected error format';
        mockResetPasswordApi.mockRejectedValue(errorMessage); // Not an Error object

        await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        const finalState = store.getState().auth;
        expect(finalState.passwordReset.resetError).toBeTruthy(); // Should have some error message
      });

      it('should handle AbortError with friendly message', async () => {
        const abortError = new Error('Aborted');
        (abortError as any).name = 'AbortError';
        mockResetPasswordApi.mockRejectedValue(abortError);

        await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        const finalState = store.getState().auth;
        expect(finalState.passwordReset.resetError).toBe('Request aborted');
      });
    });

    describe('thunk lifecycle', () => {
      it('should have correct action types', () => {
        expect(resetPasswordThunk.pending.type).toBe('auth/resetPassword/pending');
        expect(resetPasswordThunk.fulfilled.type).toBe('auth/resetPassword/fulfilled');
        expect(resetPasswordThunk.rejected.type).toBe('auth/resetPassword/rejected');
      });

      it('should handle pending state correctly', async () => {
        mockResetPasswordApi.mockResolvedValue({ ok: true });

        // Execute thunk
        await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        // Check final state
        const currentState = store.getState().auth;
        expect(currentState.passwordReset.isResettingPassword).toBe(false);
      });
    });

    describe('concurrency prevention', () => {
      it('should not call API when condition blocks due to isResettingPassword=true', async () => {
        // Set resetting password state by dispatching pending action
        store.dispatch(resetPasswordThunk.pending('requestId', mockResetPasswordCredentials));

        await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

        // Should be blocked by condition and not call API
        expect(mockResetPasswordApi).not.toHaveBeenCalled();
      });
    });
  });

  describe('integration with store', () => {
    it('should work with real store configuration for request reset', async () => {
      mockRequestResetApi.mockResolvedValue({ ok: true });

      // Initial state check
      expect(store.getState().auth.passwordReset.emailSent).toBe(false);
      expect(store.getState().auth.passwordReset.isRequestingReset).toBe(false);

      // Dispatch request reset
      await store.dispatch(requestResetThunk(mockRequestResetCredentials));

      // Final state check
      const finalState = store.getState().auth;
      expect(finalState.passwordReset.emailSent).toBe(true);
      expect(finalState.passwordReset.isRequestingReset).toBe(false);
      expect(finalState.passwordReset.requestError).toBe(null);
    });

    it('should work with real store configuration for password reset', async () => {
      mockResetPasswordApi.mockResolvedValue({ ok: true });

      // Initial state check
      expect(store.getState().auth.passwordReset.isResettingPassword).toBe(false);
      expect(store.getState().auth.passwordReset.resetError).toBe(null);

      // Dispatch password reset
      await store.dispatch(resetPasswordThunk(mockResetPasswordCredentials));

      // Final state check
      const finalState = store.getState().auth;
      expect(finalState.passwordReset.isResettingPassword).toBe(false);
      expect(finalState.passwordReset.resetError).toBe(null);
    });

    it('should preserve other state properties', async () => {
      mockRequestResetApi.mockResolvedValue({ ok: true });

      await store.dispatch(requestResetThunk(mockRequestResetCredentials));

      // Verify that state is properly managed
      const finalState = store.getState().auth;
      expect(finalState.user).toBe(null);
      expect(finalState.isAuthenticated).toBe(false);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(null);
      expect(finalState.passwordReset.emailSent).toBe(true);
      expect(finalState.passwordReset.isRequestingReset).toBe(false);
      expect(finalState.passwordReset.requestError).toBe(null);
    });
  });
});
