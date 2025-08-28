import type { RootState } from '@/store/store';
import { describe, expect, it } from 'vitest';

import { selectError, selectIsAuthenticated, selectIsLoading, selectUser } from '../selectors';
import type { User } from '../types';

describe('auth selectors', () => {
  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  const createMockRootState = (authState: any): RootState => ({
    auth: authState,
  });

  describe('selectUser', () => {
    it('should return user when user exists', () => {
      const state = createMockRootState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      expect(selectUser(state)).toEqual(mockUser);
    });

    it('should return null when user is null', () => {
      const state = createMockRootState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      expect(selectUser(state)).toBe(null);
    });
  });

  describe('selectIsAuthenticated', () => {
    it('should return true when authenticated', () => {
      const state = createMockRootState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      expect(selectIsAuthenticated(state)).toBe(true);
    });

    it('should return false when not authenticated', () => {
      const state = createMockRootState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      expect(selectIsAuthenticated(state)).toBe(false);
    });
  });

  describe('selectIsLoading', () => {
    it('should return true when loading', () => {
      const state = createMockRootState({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      });

      expect(selectIsLoading(state)).toBe(true);
    });

    it('should return false when not loading', () => {
      const state = createMockRootState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      expect(selectIsLoading(state)).toBe(false);
    });
  });

  describe('selectError', () => {
    it('should return error message when error exists', () => {
      const errorMessage = 'Login failed';
      const state = createMockRootState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });

      expect(selectError(state)).toBe(errorMessage);
    });

    it('should return null when no error', () => {
      const state = createMockRootState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      expect(selectError(state)).toBe(null);
    });
  });

  describe('memoization', () => {
    it('should return the same reference for identical auth state', () => {
      const authState = {
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

      const state1 = createMockRootState(authState);
      const state2 = createMockRootState(authState);

      const user1 = selectUser(state1);
      const user2 = selectUser(state2);

      expect(user1).toBe(user2); // Same reference due to memoization
    });

    it('should return different references for different auth state', () => {
      const state1 = createMockRootState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      const state2 = createMockRootState({
        user: { ...mockUser, name: 'Different User' },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      const user1 = selectUser(state1);
      const user2 = selectUser(state2);

      expect(user1).not.toBe(user2); // Different references
      expect(user1?.name).toBe('Test User');
      expect(user2?.name).toBe('Different User');
    });
  });
});
