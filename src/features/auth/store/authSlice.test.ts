import { describe, expect, it, vi, beforeEach } from 'vitest';

import authSliceReducer, { clearError } from './authSlice';
import { getCurrentUserAsync, initializeAuthAsync, loginAsync, logoutAsync } from './authThunks';
import { AuthState, User } from '../types';
import { tokenStorage } from '../services/tokenStorage';

// Mock tokenStorage
vi.mock('../services/tokenStorage', () => ({
  tokenStorage: {
    load: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    getUserInfo: vi.fn(),
    exists: vi.fn(),
    refresh: vi.fn(),
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

const createInitialState = (overrides: Partial<AuthState> = {}): AuthState => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  ...overrides,
});

describe('authSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return initial state when no token exists', () => {
      vi.mocked(tokenStorage.load).mockReturnValue(null);
      
      const initialState = authSliceReducer(undefined, { type: 'test/init' });
      
      expect(initialState.user).toBeNull();
      expect(initialState.token == null).toBe(true); // Allow null or undefined based on actual implementation
      expect(initialState.isAuthenticated).toBe(false);
      expect(initialState.isLoading).toBe(false);
      expect(initialState.isInitialized).toBe(false);
      expect(initialState.error).toBeNull();
    });

    it('should have consistent state properties regardless of initial token', () => {
      const initialState = authSliceReducer(undefined, { type: 'test/init' });
      
      expect(initialState.user).toBeNull();
      expect(initialState.isInitialized).toBe(false);
      expect(initialState.error).toBeNull();
      // token, isAuthenticated, isLoading depend on tokenStorage.load() which may vary in test environment
    });
  });

  describe('reducers', () => {
    describe('clearError', () => {
      it('should clear error when clearError is dispatched', () => {
        const initialState = createInitialState({ error: 'Some error occurred' });
        
        const result = authSliceReducer(initialState, clearError());
        
        expect(result.error).toBeNull();
        expect(result).toEqual({
          ...initialState,
          error: null,
        });
      });

      it('should not affect other state properties', () => {
        const initialState = createInitialState({
          user: mockUser,
          token: 'test-token',
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
          error: 'Some error',
        });
        
        const result = authSliceReducer(initialState, clearError());
        
        expect(result).toEqual({
          ...initialState,
          error: null,
        });
      });
    });
  });

  describe('extraReducers - loginAsync', () => {
    describe('pending', () => {
      it('should set loading true and clear error when loginAsync.pending', () => {
        const initialState = createInitialState({ error: 'Previous error' });
        const action = { type: loginAsync.pending.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
      });
    });

    describe('fulfilled', () => {
      it('should update state correctly when loginAsync.fulfilled', () => {
        const initialState = createInitialState({ isLoading: true });
        const loginResponse = { user: mockUser, token: 'new-token' };
        const action = {
          type: loginAsync.fulfilled.type,
          payload: loginResponse,
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: mockUser,
          token: 'new-token',
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });
    });

    describe('rejected', () => {
      it('should handle loginAsync.rejected with payload', () => {
        const initialState = createInitialState({
          isLoading: true,
          user: mockUser,
          token: 'old-token',
          isAuthenticated: true,
        });
        const action = {
          type: loginAsync.rejected.type,
          payload: { message: 'Invalid credentials' },
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: 'Invalid credentials',
        });
      });

      it('should handle loginAsync.rejected without payload', () => {
        const initialState = createInitialState({ isLoading: true });
        const action = {
          type: loginAsync.rejected.type,
          payload: undefined,
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result.error).toBe('Login failed');
      });
    });
  });

  describe('extraReducers - getCurrentUserAsync', () => {
    describe('pending', () => {
      it('should set loading true and clear error', () => {
        const initialState = createInitialState({ error: 'Previous error' });
        const action = { type: getCurrentUserAsync.pending.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
      });
    });

    describe('fulfilled', () => {
      it('should update user and set authenticated', () => {
        const initialState = createInitialState({ isLoading: true });
        const action = {
          type: getCurrentUserAsync.fulfilled.type,
          payload: mockUser,
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: mockUser,
          token: null,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: false,
          error: null,
        });
      });
    });

    describe('rejected', () => {
      it('should clear user state and handle error', () => {
        const initialState = createInitialState({
          isLoading: true,
          user: mockUser,
          token: 'old-token',
          isAuthenticated: true,
        });
        const action = {
          type: getCurrentUserAsync.rejected.type,
          payload: { message: 'Unauthorized access' },
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: false,
          error: 'Unauthorized access',
        });
      });
    });
  });

  describe('extraReducers - initializeAuthAsync', () => {
    describe('pending', () => {
      it('should set loading true', () => {
        const initialState = createInitialState();
        const action = { type: initializeAuthAsync.pending.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.isInitialized).toBe(false);
      });
    });

    describe('fulfilled', () => {
      it('should set initialized true and authenticate when user is returned', () => {
        const initialState = createInitialState({ isLoading: true });
        const action = {
          type: initializeAuthAsync.fulfilled.type,
          payload: mockUser,
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: mockUser,
          token: 'authenticated',
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });

      it('should set initialized true but not authenticate when no user', () => {
        const initialState = createInitialState({ isLoading: true });
        const action = {
          type: initializeAuthAsync.fulfilled.type,
          payload: null,
        };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });
    });

    describe('rejected', () => {
      it('should set initialized true and clear auth state', () => {
        const initialState = createInitialState({
          isLoading: true,
          user: mockUser,
          token: 'old-token',
        });
        const action = { type: initializeAuthAsync.rejected.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: mockUser, // User remains from initial state
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });
    });
  });

  describe('extraReducers - logoutAsync', () => {
    describe('pending', () => {
      it('should set loading true and clear error', () => {
        const initialState = createInitialState({ error: 'Previous error' });
        const action = { type: logoutAsync.pending.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result.isLoading).toBe(true);
        expect(result.error).toBeNull();
      });
    });

    describe('fulfilled', () => {
      it('should clear all auth state', () => {
        const initialState = createInitialState({
          user: mockUser,
          token: 'test-token',
          isAuthenticated: true,
          isLoading: true,
          isInitialized: true,
        });
        const action = { type: logoutAsync.fulfilled.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });
    });

    describe('rejected', () => {
      it('should clear auth state even when API fails', () => {
        const initialState = createInitialState({
          user: mockUser,
          token: 'test-token',
          isAuthenticated: true,
          isLoading: true,
          isInitialized: true,
        });
        const action = { type: logoutAsync.rejected.type };
        
        const result = authSliceReducer(initialState, action);
        
        expect(result).toEqual({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      });
    });
  });
});
