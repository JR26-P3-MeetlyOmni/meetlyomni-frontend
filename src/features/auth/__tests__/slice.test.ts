import { describe, expect, it } from 'vitest';

import authReducer from '../slice';
import { loginThunk } from '../thunks';
import type { AuthState, User } from '../types';

describe('auth slice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
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
  });

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
    it('should set error and stop loading', () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
        user: mockUser,
        isAuthenticated: true,
      };

      const errorMessage = 'Login failed';
      const action = loginThunk.rejected(new Error(errorMessage), 'requestId', {
        email: 'test@example.com',
        password: 'password',
      });
      const newState = authReducer(previousState, action);

      expect(newState.error).toBe(errorMessage);
      expect(newState.isLoading).toBe(false);
      expect(newState.user).toBe(null);
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('thunk action types', () => {
    it('should have correct action types', () => {
      expect(loginThunk.pending.type).toBe('auth/login/pending');
      expect(loginThunk.fulfilled.type).toBe('auth/login/fulfilled');
      expect(loginThunk.rejected.type).toBe('auth/login/rejected');
    });
  });
});
