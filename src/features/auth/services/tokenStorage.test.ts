import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { tokenStorage } from './tokenStorage';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock console methods
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('tokenStorage', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
    // Set default API URL for tests
    process.env.NEXT_PUBLIC_API_URL = 'https://localhost:5000/api';
    // Mock document.cookie to be writable for testing
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  afterEach(() => {
    // Restore original environment
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });

  describe('load', () => {
    it('should return "authenticated" when user_info cookie exists', () => {
      document.cookie = 'user_info=some_value';
      expect(tokenStorage.load()).toBe('authenticated');
    });

    it('should return null when user_info cookie does not exist', () => {
      document.cookie = '';
      expect(tokenStorage.load()).toBeNull();
    });
  });

  describe('getUserInfo', () => {
    it('should return parsed and normalized user info', () => {
      const userInfo = {
        id: '1',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
        organizationId: 'org-1',
        organizationCode: 'ORG001',
        phoneNumber: '+1234567890',
      };
      document.cookie = `user_info=${encodeURIComponent(JSON.stringify(userInfo))}`;
      
      const result = tokenStorage.getUserInfo();
      expect(result).toEqual(expect.objectContaining({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        fullName: 'Test User',
        role: 'user',
      }));
    });

    it('should return null when user_info cookie does not exist', () => {
      document.cookie = '';
      expect(tokenStorage.getUserInfo()).toBeNull();
    });
  });

  describe('exists', () => {
    it('should return true when user_info cookie exists', () => {
      document.cookie = 'user_info=some_value';
      expect(tokenStorage.exists()).toBe(true);
    });

    it('should return false when user_info cookie does not exist', () => {
      document.cookie = '';
      expect(tokenStorage.exists()).toBe(false);
    });
  });

  describe('save', () => {
    it('should do nothing (server handles token saving)', () => {
      // This method should do nothing as tokens are saved server-side
      expect(() => tokenStorage.save()).not.toThrow();
    });
  });

  describe('remove', () => {
    describe('when logout API succeeds', () => {
      it('should call logout endpoint with correct parameters', async () => {
        mockFetch.mockResolvedValue(new Response('', { status: 200 }));

        await tokenStorage.remove();

        expect(mockFetch).toHaveBeenCalledWith(
          'https://localhost:5000/api/auth/logout',
          {
            method: 'POST',
            credentials: 'include',
          }
        );
      });

      it('should use custom API URL when provided', async () => {
        const originalEnv = process.env.NEXT_PUBLIC_API_URL;
        process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/v1';

        mockFetch.mockResolvedValue(new Response('', { status: 200 }));

        await tokenStorage.remove();

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/v1/auth/logout',
          {
            method: 'POST',
            credentials: 'include',
          }
        );

        process.env.NEXT_PUBLIC_API_URL = originalEnv;
      });
    });

    describe('when logout API fails', () => {
      it('should handle error gracefully when logout API fails', async () => {
        const error = new Error('Network error');
        mockFetch.mockRejectedValue(error);

        // Should not throw despite the error
        await expect(tokenStorage.remove()).resolves.toBeUndefined();
      });

      it('should handle fetch rejection gracefully', async () => {
        mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

        await expect(tokenStorage.remove()).resolves.toBeUndefined();
      });
    });
  });

  describe('refresh', () => {
    describe('when refresh API succeeds', () => {
      it('should return true', async () => {
        mockFetch.mockResolvedValue(new Response('', { status: 200 }));

        const result = await tokenStorage.refresh();

        expect(result).toBe(true);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://localhost:5000/api/auth/refresh',
          {
            method: 'POST',
            credentials: 'include',
          }
        );
      });

      it('should use custom API URL when provided', async () => {
        const originalEnv = process.env.NEXT_PUBLIC_API_URL;
        process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/v1';

        mockFetch.mockResolvedValue(new Response('', { status: 200 }));

        await tokenStorage.refresh();

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/v1/auth/refresh',
          {
            method: 'POST',
            credentials: 'include',
          }
        );

        process.env.NEXT_PUBLIC_API_URL = originalEnv;
      });
    });

    describe('when refresh API fails', () => {
      it('should return false when response is not ok', async () => {
        mockFetch.mockResolvedValue(new Response('', { status: 401 }));

        const result = await tokenStorage.refresh();

        expect(result).toBe(false);
      });

      it('should return false when fetch throws error', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        const result = await tokenStorage.refresh();

        expect(result).toBe(false);
      });

      it('should return false when fetch throws TypeError', async () => {
        mockFetch.mockRejectedValue(new TypeError('Failed to fetch'));

        const result = await tokenStorage.refresh();

        expect(result).toBe(false);
      });
    });
  });

  describe('SSR behavior', () => {
    it('should handle SSR environment gracefully', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Intentionally setting to undefined for SSR test
      delete global.window;

      // These methods should not throw in SSR environment
      expect(() => tokenStorage.load()).not.toThrow();
      expect(() => tokenStorage.getUserInfo()).not.toThrow();
      expect(() => tokenStorage.exists()).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe('error handling', () => {
    it('should handle API errors gracefully in remove method', async () => {
      mockFetch.mockRejectedValue(new Error('Server error'));

      await expect(tokenStorage.remove()).resolves.not.toThrow();
    });

    it('should handle API errors gracefully in refresh method', async () => {
      mockFetch.mockRejectedValue(new Error('Server error'));

      const result = await tokenStorage.refresh();
      expect(result).toBe(false);
    });
  });
});
