import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createWrapper, mockAuthState, mockUnauthenticatedState } from '@/test-utils/test-utils';

// Mock selectors to avoid Redux state structure issues
vi.mock('../store/selectors', () => ({
  selectAuthState: vi.fn(),
  selectIsInitialized: vi.fn(),
}));

// Mock Redux dispatch hook
vi.mock('../../../store/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
  useAppSelector: vi.fn(),
}));

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAuthState, selectIsInitialized } from '../store/selectors';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  describe('when user is authenticated', () => {
    it('should return authenticated state', () => {
      // Mock selector returns
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockAuthState) // selectAuthState
        .mockReturnValueOnce(true); // selectIsInitialized
      
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toEqual(mockAuthState.user);
      expect(result.current.token).toBe(mockAuthState.token);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isInitialized).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('should provide initializeAuth function', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockAuthState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      expect(typeof result.current.initializeAuth).toBe('function');
    });

    it('should provide clearError function', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockAuthState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      expect(typeof result.current.clearError).toBe('function');
    });
  });

  describe('when user is not authenticated', () => {
    it('should return unauthenticated state', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockUnauthenticatedState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isInitialized).toBe(true);
      expect(result.current.error).toBeNull();
    });
  });

  describe('actions', () => {
    it('should call dispatch when initializeAuth is called', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockAuthState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.initializeAuth();
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call dispatch when clearError is called', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockAuthState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.clearError();
      });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('error state', () => {
    it('should return error when auth has error', () => {
      const errorState = {
        ...mockUnauthenticatedState,
        error: 'Authentication failed'
      };

      vi.mocked(useAppSelector)
        .mockReturnValueOnce(errorState)
        .mockReturnValueOnce(true);
      
      const { result } = renderHook(() => useAuth());

      expect(result.current.error).toBe('Authentication failed');
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('loading state', () => {
    it('should return loading state correctly', () => {
      const loadingState = {
        ...mockUnauthenticatedState,
        isLoading: true
      };

      vi.mocked(useAppSelector)
        .mockReturnValueOnce(loadingState)
        .mockReturnValueOnce(false);
      
      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('initialization state', () => {
    it('should return correct initialization state', () => {
      vi.mocked(useAppSelector)
        .mockReturnValueOnce(mockUnauthenticatedState)
        .mockReturnValueOnce(false);
      
      const { result } = renderHook(() => useAuth());

      expect(result.current.isInitialized).toBe(false);
    });
  });
});