import { describe, expect, it, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import { authApi, AuthApiError } from '../api/authApi';
import authSliceReducer from './authSlice';
import { getCurrentUserAsync, initializeAuthAsync, loginAsync, logoutAsync } from './authThunks';
import { tokenStorage } from '../services/tokenStorage';
import { AUTH_MESSAGES } from '../constants/messages';
import { User, LoginCredentials } from '../types';

// Mock dependencies
vi.mock('../api/authApi', () => ({
  authApi: {
    login: vi.fn(),
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  },
  AuthApiError: class AuthApiError extends Error {
    constructor(message: string, public status: number) {
      super(message);
      this.name = 'AuthApiError';
    }
  },
}));

vi.mock('../services/tokenStorage', () => ({
  tokenStorage: {
    load: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
  },
}));

// Mock user data
const mockUser: User = {
  id: '1',
  organizationId: 'org-1',
  organizationCode: 'ORG001',
  fullName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '+1234567890',
  role: 'user',
};

const mockCredentials: LoginCredentials = {
  email: 'test@example.com',
  password: 'Password123',
};

// Create test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authSliceReducer,
    },
  });
};

describe('authThunks', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe('loginAsync', () => {
    describe('when login succeeds', () => {
      it('should dispatch fulfilled action and save token', async () => {
        const mockLoginResponse = { user: mockUser, token: 'jwt-token' };
        vi.mocked(authApi.login).mockResolvedValue(mockLoginResponse);
        vi.mocked(tokenStorage.save).mockResolvedValue(undefined);

        const result = await store.dispatch(loginAsync(mockCredentials));

        expect(result.type).toBe('auth/login/fulfilled');
        expect(result.payload).toEqual({
          user: mockUser,
          token: 'authenticated',
        });
        expect(authApi.login).toHaveBeenCalledWith(mockCredentials);
        expect(tokenStorage.save).toHaveBeenCalled();
      });

      it('should update store state correctly', async () => {
        const mockLoginResponse = { user: mockUser, token: 'jwt-token' };
        vi.mocked(authApi.login).mockResolvedValue(mockLoginResponse);
        vi.mocked(tokenStorage.save).mockResolvedValue(undefined);

        await store.dispatch(loginAsync(mockCredentials));

        const state = store.getState().auth;
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe('authenticated');
        expect(state.isAuthenticated).toBe(true);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
      });
    });

    describe('when login fails', () => {
      it('should dispatch rejected action with AuthApiError', async () => {
        const error = new AuthApiError('Invalid credentials', 401);
        vi.mocked(authApi.login).mockRejectedValue(error);

        const result = await store.dispatch(loginAsync(mockCredentials));

        expect(result.type).toBe('auth/login/rejected');
        expect(result.payload).toEqual({
          message: 'Invalid credentials',
          status: 401,
        });
      });

      it('should dispatch rejected action with unexpected error', async () => {
        const error = new Error('Network error');
        vi.mocked(authApi.login).mockRejectedValue(error);

        const result = await store.dispatch(loginAsync(mockCredentials));

        expect(result.type).toBe('auth/login/rejected');
        expect(result.payload).toEqual({
          message: AUTH_MESSAGES.UNEXPECTED_ERROR,
        });
      });

      it('should update store state correctly on failure', async () => {
        const error = new AuthApiError('Invalid credentials', 401);
        vi.mocked(authApi.login).mockRejectedValue(error);

        await store.dispatch(loginAsync(mockCredentials));

        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Invalid credentials');
      });
    });
  });

  describe('getCurrentUserAsync', () => {
    describe('when getCurrentUser succeeds', () => {
      it('should dispatch fulfilled action with user data', async () => {
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

        const result = await store.dispatch(getCurrentUserAsync());

        expect(result.type).toBe('auth/getCurrentUser/fulfilled');
        expect(result.payload).toEqual(mockUser);
        expect(authApi.getCurrentUser).toHaveBeenCalled();
      });

      it('should update store state correctly', async () => {
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

        await store.dispatch(getCurrentUserAsync());

        const state = store.getState().auth;
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
      });
    });

    describe('when getCurrentUser fails', () => {
      it('should dispatch rejected action with AuthApiError', async () => {
        const error = new AuthApiError('Unauthorized', 401);
        vi.mocked(authApi.getCurrentUser).mockRejectedValue(error);

        const result = await store.dispatch(getCurrentUserAsync());

        expect(result.type).toBe('auth/getCurrentUser/rejected');
        expect(result.payload).toEqual({
          message: 'Unauthorized',
          status: 401,
        });
      });

      it('should dispatch rejected action with unexpected error', async () => {
        const error = new Error('Network error');
        vi.mocked(authApi.getCurrentUser).mockRejectedValue(error);

        const result = await store.dispatch(getCurrentUserAsync());

        expect(result.type).toBe('auth/getCurrentUser/rejected');
        expect(result.payload).toEqual({
          message: AUTH_MESSAGES.GET_USER_FAILED,
        });
      });

      it('should clear auth state on failure', async () => {
        // Set initial authenticated state
        await store.dispatch({
          type: 'auth/login/fulfilled',
          payload: { user: mockUser, token: 'test-token' },
        });

        const error = new AuthApiError('Unauthorized', 401);
        vi.mocked(authApi.getCurrentUser).mockRejectedValue(error);

        await store.dispatch(getCurrentUserAsync());

        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe('Unauthorized');
      });
    });
  });

  describe('initializeAuthAsync', () => {
    describe('when user already exists in state', () => {
      it('should return existing user without API call', async () => {
        // Set user in state first
        await store.dispatch({
          type: 'auth/login/fulfilled',
          payload: { user: mockUser, token: 'test-token' },
        });

        const result = await store.dispatch(initializeAuthAsync());

        expect(result.type).toBe('auth/initialize/fulfilled');
        expect(result.payload).toEqual(mockUser);
        expect(authApi.getCurrentUser).not.toHaveBeenCalled();
      });
    });

    describe('when no token exists', () => {
      it('should return null without API call', async () => {
        vi.mocked(tokenStorage.load).mockReturnValue(null);

        const result = await store.dispatch(initializeAuthAsync());

        expect(result.type).toBe('auth/initialize/fulfilled');
        expect(result.payload).toBeNull();
        expect(authApi.getCurrentUser).not.toHaveBeenCalled();
      });
    });

    describe('when token exists and API succeeds', () => {
      it('should fetch user and return user data', async () => {
        vi.mocked(tokenStorage.load).mockReturnValue('existing-token');
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

        const result = await store.dispatch(initializeAuthAsync());

        expect(result.type).toBe('auth/initialize/fulfilled');
        expect(result.payload).toEqual(mockUser);
        expect(authApi.getCurrentUser).toHaveBeenCalled();
      });

      it('should update store state correctly', async () => {
        vi.mocked(tokenStorage.load).mockReturnValue('existing-token');
        vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

        await store.dispatch(initializeAuthAsync());

        const state = store.getState().auth;
        expect(state.user).toEqual(mockUser);
        expect(state.token).toBe('authenticated');
        expect(state.isAuthenticated).toBe(true);
        expect(state.isInitialized).toBe(true);
      });
    });

    describe('when token exists but API fails', () => {
      it('should remove token and return null', async () => {
        vi.mocked(tokenStorage.load).mockReturnValue('invalid-token');
        vi.mocked(authApi.getCurrentUser).mockRejectedValue(new Error('Invalid token'));
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        const result = await store.dispatch(initializeAuthAsync());

        expect(result.type).toBe('auth/initialize/fulfilled');
        expect(result.payload).toBeNull();
        expect(tokenStorage.remove).toHaveBeenCalled();
      });

      it('should update store state correctly on failure', async () => {
        vi.mocked(tokenStorage.load).mockReturnValue('invalid-token');
        vi.mocked(authApi.getCurrentUser).mockRejectedValue(new Error('Invalid token'));
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        await store.dispatch(initializeAuthAsync());

        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.isInitialized).toBe(true);
      });
    });
  });

  describe('logoutAsync', () => {
    describe('when logout succeeds', () => {
      it('should dispatch fulfilled action and remove token', async () => {
        vi.mocked(authApi.logout).mockResolvedValue(undefined);
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        const result = await store.dispatch(logoutAsync());

        expect(result.type).toBe('auth/logout/fulfilled');
        expect(authApi.logout).toHaveBeenCalled();
        expect(tokenStorage.remove).toHaveBeenCalled();
      });

      it('should clear auth state', async () => {
        // Set initial authenticated state
        await store.dispatch({
          type: 'auth/login/fulfilled',
          payload: { user: mockUser, token: 'test-token' },
        });

        vi.mocked(authApi.logout).mockResolvedValue(undefined);
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        await store.dispatch(logoutAsync());

        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBeNull();
      });
    });

    describe('when logout API fails', () => {
      it('should still remove token and dispatch rejected action', async () => {
        const error = new AuthApiError('Logout failed', 500);
        vi.mocked(authApi.logout).mockRejectedValue(error);
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        const result = await store.dispatch(logoutAsync());

        expect(result.type).toBe('auth/logout/rejected');
        expect(result.payload).toEqual({
          message: 'Logout failed',
          status: 500,
        });
        expect(tokenStorage.remove).toHaveBeenCalled();
      });

      it('should clear auth state even when API fails', async () => {
        // Set initial authenticated state
        await store.dispatch({
          type: 'auth/login/fulfilled',
          payload: { user: mockUser, token: 'test-token' },
        });

        const error = new AuthApiError('Logout failed', 500);
        vi.mocked(authApi.logout).mockRejectedValue(error);
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        await store.dispatch(logoutAsync());

        const state = store.getState().auth;
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
        expect(state.isAuthenticated).toBe(false);
      });

      it('should handle unexpected errors', async () => {
        const error = new Error('Network error');
        vi.mocked(authApi.logout).mockRejectedValue(error);
        vi.mocked(tokenStorage.remove).mockResolvedValue(undefined);

        const result = await store.dispatch(logoutAsync());

        expect(result.type).toBe('auth/logout/rejected');
        expect(result.payload).toEqual({
          message: AUTH_MESSAGES.LOGOUT_FAILED,
        });
      });
    });
  });
});
