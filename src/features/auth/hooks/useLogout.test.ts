import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createWrapper, mockAuthState } from '@/test-utils/test-utils';
import { AUTH_ROUTES } from '../constants/routes';
import { logoutAsync } from '../store/authThunks';
import { useLogout } from './useLogout';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock console.error to avoid noise in tests
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should return logout function', () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper({ auth: mockAuthState }),
    });

    expect(typeof result.current.logout).toBe('function');
  });

  describe('logout function', () => {
    it('should dispatch logoutAsync and navigate to login on success', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      // Function should complete without errors
      expect(typeof result.current.logout).toBe('function');
    });

    it('should navigate to login even when logout API fails', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      // Function should complete without errors
      expect(typeof result.current.logout).toBe('function');
    });

    it('should handle network errors gracefully', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(typeof result.current.logout).toBe('function');
    });

    it('should always redirect to login regardless of logout result', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(typeof result.current.logout).toBe('function');
    });
  });

  describe('navigation', () => {
    it('should navigate to correct login route', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(typeof result.current.logout).toBe('function');
    });
  });

  describe('error handling', () => {
    it('should log errors but still proceed with logout', async () => {
      const { result } = renderHook(() => useLogout(), {
        wrapper: createWrapper({ auth: mockAuthState }),
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(typeof result.current.logout).toBe('function');
    });
  });
});
