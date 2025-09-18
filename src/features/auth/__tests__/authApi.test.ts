import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loginApi } from '../authApi';
import type { LoginCredentials, User } from '../types';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('authApi', () => {
  const mockCredentials: LoginCredentials = {
    email: 'test@example.com',
    password: 'password',
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  // Helper function to mock CSRF token cookie behavior
  const mockCsrfTokenCookie = (token: string = 'test-csrf-token') => {
    let callCount = 0;
    vi.spyOn(window.document, 'cookie', 'get').mockImplementation(() => {
      callCount++;
      // Return empty string for first call (before CSRF fetch), then return token
      return callCount === 1 ? '' : `XSRF-TOKEN=${token}`;
    });
  };

  beforeEach(() => {
    mockFetch.mockClear();
    // Reset environment variable
    vi.unstubAllEnvs();

    // Mock document.cookie for CSRF token
    Object.defineProperty(window, 'document', {
      value: {
        cookie: '',
      },
      writable: true,
    });

    // Mock getCookie function to return empty string initially
    // This will trigger the CSRF token fetch
    vi.spyOn(window.document, 'cookie', 'get').mockReturnValue('');
  });

  describe('loginApi', () => {
    it('should make POST request to correct URL with credentials', async () => {
      // Mock CSRF token response first
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      // Mock login response
      const loginResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ user: mockUser }),
      };

      // Mock CSRF token cookie behavior
      mockCsrfTokenCookie();

      // Mock fetch to return CSRF response first, then login response
      mockFetch
        .mockResolvedValueOnce(csrfResponse) // CSRF call
        .mockResolvedValueOnce(loginResponse); // Login call

      await loginApi(mockCredentials);

      // Check CSRF call
      expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://localhost:7011/api/v1/auth/csrf', {
        method: 'GET',
        credentials: 'include',
        signal: undefined,
        headers: {
          Accept: 'application/json',
        },
      });

      // Check login call
      expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://localhost:7011/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': 'test-csrf-token',
        },
        body: JSON.stringify(mockCredentials),
        signal: undefined,
      });
    });

    it('should return user data on successful login', async () => {
      const expectedResponse = { user: mockUser };

      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(expectedResponse),
      };

      // Mock CSRF token cookie behavior
      mockCsrfTokenCookie();

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      const result = await loginApi(mockCredentials);

      expect(result).toEqual(expectedResponse);
      expect(loginResponse.json).toHaveBeenCalledTimes(1);
    });

    it('should throw error with message from response on 401', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const errorResponse = { error: 'Invalid username or password' };
      const loginResponse = {
        ok: false,
        status: 401,
        json: vi.fn().mockResolvedValue(errorResponse),
      };

      // Mock CSRF token cookie behavior
      mockCsrfTokenCookie();

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await expect(loginApi(mockCredentials)).rejects.toThrow('Invalid username or password');
      expect(loginResponse.json).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');

      // Mock CSRF token cookie behavior
      mockCsrfTokenCookie();

      mockFetch.mockRejectedValue(networkError);

      // Network error during CSRF token fetch should throw CSRF token error
      await expect(loginApi(mockCredentials)).rejects.toThrow(
        'Unable to obtain CSRF token for authentication',
      );
    });

    it('should send credentials with every request', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ user: mockUser }),
      };

      // Mock CSRF token cookie behavior
      mockCsrfTokenCookie();

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await loginApi(mockCredentials);

      expect(mockFetch).toHaveBeenCalledTimes(2);

      // Check that both calls include credentials
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          credentials: 'include',
        }),
      );
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          credentials: 'include',
        }),
      );
    });
  });
});
