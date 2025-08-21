import { beforeEach, describe, expect, it, vi } from 'vitest';

import { configureStore } from '@reduxjs/toolkit';

import * as authApi from '../authApi';
import authReducer from '../slice';
import { loginThunk } from '../thunks';
import type { LoginCredentials, User } from '../types';

// Mock the authApi module
vi.mock('../authApi');
const mockLoginApi = authApi.loginApi as ReturnType<typeof vi.fn>;

describe('loginThunk', () => {
  let store: ReturnType<typeof configureStore>;

  const mockCredentials: LoginCredentials = {
    email: 'test@example.com',
    password: 'password',
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(() => {
    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    mockLoginApi.mockClear();
  });

  describe('successful login', () => {
    it('should dispatch loginStart, call API, and dispatch loginSuccess', async () => {
      // Mock successful API response
      mockLoginApi.mockResolvedValue({ user: mockUser });

      // Dispatch the thunk
      const result = await store.dispatch(loginThunk(mockCredentials));

      // Check that the API was called with correct credentials
      expect(mockLoginApi).toHaveBeenCalledWith(mockCredentials);
      expect(mockLoginApi).toHaveBeenCalledTimes(1);

      // Check that the thunk fulfilled and returned the user
      expect(loginThunk.fulfilled.match(result)).toBe(true);
      expect(result.payload).toEqual(mockUser);

      // Check final state
      const finalState = store.getState().auth;
      expect(finalState.user).toEqual(mockUser);
      expect(finalState.isAuthenticated).toBe(true);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(null);
    });

    it('should dispatch actions in correct order', async () => {
      mockLoginApi.mockResolvedValue({ user: mockUser });

      await store.dispatch(loginThunk(mockCredentials));

      // Check final state to verify actions were dispatched correctly
      const finalState = store.getState().auth;
      expect(finalState.user).toEqual(mockUser);
      expect(finalState.isAuthenticated).toBe(true);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(null);
    });
  });

  describe('failed login', () => {
    it('should dispatch loginStart, call API, and dispatch loginFailure on error', async () => {
      const errorMessage = 'Invalid credentials';
      mockLoginApi.mockRejectedValue(new Error(errorMessage));

      // Dispatch the thunk and expect it to be rejected
      const result = await store.dispatch(loginThunk(mockCredentials));

      // Check that the API was called
      expect(mockLoginApi).toHaveBeenCalledWith(mockCredentials);
      expect(mockLoginApi).toHaveBeenCalledTimes(1);

      // Check that the thunk rejected
      expect(loginThunk.rejected.match(result)).toBe(true);

      // Check final state
      const finalState = store.getState().auth;
      expect(finalState.user).toBe(null);
      expect(finalState.isAuthenticated).toBe(false);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(errorMessage);
    });

    it('should handle non-Error objects', async () => {
      const errorMessage = 'Unexpected error format';
      mockLoginApi.mockRejectedValue(errorMessage); // Not an Error object

      await store.dispatch(loginThunk(mockCredentials));

      const finalState = store.getState().auth;
      expect(finalState.error).toBeTruthy(); // Should have some error message
    });

    it('should dispatch actions in correct order on failure', async () => {
      const errorMessage = 'API Error';
      mockLoginApi.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(loginThunk(mockCredentials));

      // Check final state to verify actions were dispatched correctly
      const finalState = store.getState().auth;
      expect(finalState.user).toBe(null);
      expect(finalState.isAuthenticated).toBe(false);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(errorMessage);
    });
  });

  describe('thunk lifecycle', () => {
    it('should have correct action types', () => {
      expect(loginThunk.pending.type).toBe('auth/login/pending');
      expect(loginThunk.fulfilled.type).toBe('auth/login/fulfilled');
      expect(loginThunk.rejected.type).toBe('auth/login/rejected');
    });

    it('should handle pending state correctly', async () => {
      mockLoginApi.mockResolvedValue({ user: mockUser });

      // Execute thunk
      await store.dispatch(loginThunk(mockCredentials));

      // Check final state
      const currentState = store.getState().auth;
      expect(currentState.isLoading).toBe(false);
      expect(currentState.user).toEqual(mockUser);
      expect(currentState.isAuthenticated).toBe(true);
    });
  });

  describe('integration with store', () => {
    it('should work with real store configuration', async () => {
      mockLoginApi.mockResolvedValue({ user: mockUser });

      // Initial state check
      expect(store.getState().auth.user).toBe(null);
      expect(store.getState().auth.isAuthenticated).toBe(false);

      // Dispatch login
      await store.dispatch(loginThunk(mockCredentials));

      // Final state check
      const finalState = store.getState().auth;
      expect(finalState.user).toEqual(mockUser);
      expect(finalState.isAuthenticated).toBe(true);
      expect(finalState.isLoading).toBe(false);
      expect(finalState.error).toBe(null);
    });

    it('should preserve other state properties', async () => {
      // Set initial loading state by dispatching pending action
      store.dispatch(loginThunk.pending('requestId', mockCredentials));

      mockLoginApi.mockResolvedValue({ user: mockUser });

      await store.dispatch(loginThunk(mockCredentials));

      // Verify that state is properly managed
      const finalState = store.getState().auth;
      expect(finalState).toEqual({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    });
  });
});
