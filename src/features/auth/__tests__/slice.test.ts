import { describe, expect, it } from 'vitest';

import authReducer, { loginFailure, loginStart, loginSuccess } from '../slice';
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

  describe('loginStart', () => {
    it('should set loading to true and clear error', () => {
      const previousState: AuthState = {
        ...initialState,
        error: 'Previous error',
      };

      const newState = authReducer(previousState, loginStart());

      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
      expect(newState.user).toBe(null);
      expect(newState.isAuthenticated).toBe(false);
    });
  });

  describe('loginSuccess', () => {
    it('should set user, authenticated to true, and loading to false', () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
        error: 'Some error',
      };

      const newState = authReducer(previousState, loginSuccess(mockUser));

      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Some error');
    });
  });

  describe('loginFailure', () => {
    it('should set error and stop loading', () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
        user: mockUser,
        isAuthenticated: true,
      };

      const errorMessage = 'Login failed';
      const newState = authReducer(previousState, loginFailure(errorMessage));

      expect(newState.error).toBe(errorMessage);
      expect(newState.isLoading).toBe(false);
      expect(newState.user).toEqual(mockUser);
      expect(newState.isAuthenticated).toBe(true);
    });
  });

  describe('action creators', () => {
    it('should create loginStart action', () => {
      expect(loginStart()).toEqual({
        type: 'auth/loginStart',
      });
    });

    it('should create loginSuccess action with user payload', () => {
      expect(loginSuccess(mockUser)).toEqual({
        type: 'auth/loginSuccess',
        payload: mockUser,
      });
    });

    it('should create loginFailure action with error payload', () => {
      const error = 'Login failed';
      expect(loginFailure(error)).toEqual({
        type: 'auth/loginFailure',
        payload: error,
      });
    });
  });
});
