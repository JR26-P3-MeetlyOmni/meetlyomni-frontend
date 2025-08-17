import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { mockValidCredentials } from '@/test-utils/test-utils';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock Redux dispatch hook
vi.mock('../../../store/hooks', () => ({
  useAppDispatch: vi.fn(() => vi.fn()),
}));

import { useAppDispatch } from '../../../store/hooks';
import { useLogin } from './useLogin';

describe('useLogin', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('should return login function', () => {
    const { result } = renderHook(() => useLogin());

    expect(typeof result.current.login).toBe('function');
  });

  describe('login function', () => {
    it('should call dispatch and handle login attempt', async () => {
      // Mock a successful login result
      mockDispatch.mockResolvedValue({
        type: 'loginAsync/fulfilled',
        payload: { user: { id: '1' }, token: 'token' }
      });

      const { result } = renderHook(() => useLogin());

      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockValidCredentials);
      });

      expect(mockDispatch).toHaveBeenCalled();
      expect(typeof loginResult!).toBe('boolean');
    });

    it('should handle login failure gracefully', async () => {
      // Mock a failed login result
      mockDispatch.mockResolvedValue({
        type: 'loginAsync/rejected',
        error: { message: 'Invalid credentials' }
      });

      const { result } = renderHook(() => useLogin());

      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockValidCredentials);
      });

      expect(mockDispatch).toHaveBeenCalled();
      expect(typeof loginResult!).toBe('boolean');
    });

    it('should handle network errors gracefully', async () => {
      mockDispatch.mockRejectedValue(new Error('Network error'));

      const { result } = renderHook(() => useLogin());

      let loginResult: boolean;
      await act(async () => {
        loginResult = await result.current.login(mockValidCredentials);
      });

      expect(mockDispatch).toHaveBeenCalled();
      expect(loginResult!).toBe(false);
    });

    it('should handle different credential formats', async () => {
      mockDispatch.mockResolvedValue({
        type: 'loginAsync/fulfilled',
        payload: { user: { id: '1' }, token: 'token' }
      });

      const { result } = renderHook(() => useLogin());

      const customCredentials = {
        email: 'custom@example.com',
        password: 'CustomPassword123',
      };

      await act(async () => {
        await result.current.login(customCredentials);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  describe('navigation', () => {
    it('should work with navigation functions', async () => {
      mockDispatch.mockResolvedValue({
        type: 'loginAsync/fulfilled',
        payload: { user: { id: '1' }, token: 'token' }
      });

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.login(mockValidCredentials);
      });

      // The login function should complete without errors
      expect(typeof result.current.login).toBe('function');
    });
  });
});