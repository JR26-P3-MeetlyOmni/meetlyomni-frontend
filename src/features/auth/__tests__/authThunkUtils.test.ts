import type { RootState } from '@/store/store';
import { describe, expect, it } from 'vitest';

import type { AuthError } from '../types';
import {
  canLogin,
  canRequestPasswordReset,
  canResetPassword,
  isAbortError,
  toAuthError,
} from '../utils/authThunkUtils';

describe('authThunkUtils', () => {
  describe('isAbortError', () => {
    it('returns true for AbortError', () => {
      const error = new Error('Request aborted');
      error.name = 'AbortError';

      expect(isAbortError(error)).toBe(true);
    });

    it('returns false for regular Error', () => {
      const error = new Error('Regular error');

      expect(isAbortError(error)).toBe(false);
    });

    it('returns false for non-Error objects', () => {
      expect(isAbortError('string error')).toBe(false);
      expect(isAbortError(null)).toBe(false);
      expect(isAbortError(undefined)).toBe(false);
      expect(isAbortError({ message: 'error' })).toBe(false);
    });
  });

  describe('toAuthError', () => {
    it('converts AbortError to auth error', () => {
      const error = new Error('Request aborted');
      error.name = 'AbortError';

      const result = toAuthError(error, 'Fallback message', 'FALLBACK_CODE');

      expect(result).toEqual({
        message: 'Request aborted',
        code: 'ABORTED',
      });
    });

    it('converts regular Error to auth error', () => {
      const error = new Error('Network error');

      const result = toAuthError(error, 'Fallback message', 'FALLBACK_CODE');

      expect(result).toEqual({
        message: 'Network error',
        code: 'FALLBACK_CODE',
      });
    });

    it('uses fallback message for non-Error objects', () => {
      const result = toAuthError('string error', 'Fallback message', 'FALLBACK_CODE');

      expect(result).toEqual({
        message: 'Fallback message',
        code: 'FALLBACK_CODE',
      });
    });

    it('uses fallback message for null/undefined', () => {
      const nullResult = toAuthError(null, 'Fallback message', 'FALLBACK_CODE');
      const undefinedResult = toAuthError(undefined, 'Fallback message', 'FALLBACK_CODE');

      expect(nullResult).toEqual({
        message: 'Fallback message',
        code: 'FALLBACK_CODE',
      });

      expect(undefinedResult).toEqual({
        message: 'Fallback message',
        code: 'FALLBACK_CODE',
      });
    });
  });

  describe('canLogin', () => {
    const createMockState = (overrides: Partial<RootState['auth']> = {}): RootState =>
      ({
        auth: {
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
          ...overrides,
        },
      }) as RootState;

    it('returns true when user can login', () => {
      const state = createMockState({
        isLoading: false,
        isAuthenticated: false,
      });

      expect(canLogin(state)).toBe(true);
    });

    it('returns false when already authenticated', () => {
      const state = createMockState({
        isLoading: false,
        isAuthenticated: true,
      });

      expect(canLogin(state)).toBe(false);
    });

    it('returns false when loading', () => {
      const state = createMockState({
        isLoading: true,
        isAuthenticated: false,
      });

      expect(canLogin(state)).toBe(false);
    });

    it('returns false when loading and authenticated', () => {
      const state = createMockState({
        isLoading: true,
        isAuthenticated: true,
      });

      expect(canLogin(state)).toBe(false);
    });
  });

  describe('canRequestPasswordReset', () => {
    const createMockState = (
      overrides: Partial<RootState['auth']['passwordReset']> = {},
    ): RootState =>
      ({
        auth: {
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
            ...overrides,
          },
        },
      }) as RootState;

    it('returns true when not requesting reset', () => {
      const state = createMockState({
        isRequestingReset: false,
      });

      expect(canRequestPasswordReset(state)).toBe(true);
    });

    it('returns false when already requesting reset', () => {
      const state = createMockState({
        isRequestingReset: true,
      });

      expect(canRequestPasswordReset(state)).toBe(false);
    });
  });

  describe('canResetPassword', () => {
    const createMockState = (
      overrides: Partial<RootState['auth']['passwordReset']> = {},
    ): RootState =>
      ({
        auth: {
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
            ...overrides,
          },
        },
      }) as RootState;

    it('returns true when not resetting password', () => {
      const state = createMockState({
        isResettingPassword: false,
      });

      expect(canResetPassword(state)).toBe(true);
    });

    it('returns false when already resetting password', () => {
      const state = createMockState({
        isResettingPassword: true,
      });

      expect(canResetPassword(state)).toBe(false);
    });
  });
});
