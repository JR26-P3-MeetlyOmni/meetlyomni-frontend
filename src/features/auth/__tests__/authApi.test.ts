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
      });

      // Check login call
      expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://localhost:7011/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-XSRF-TOKEN': '', // Empty CSRF token in test
        },
        body: JSON.stringify(mockCredentials),
        signal: undefined,
      });
    });

    it('should use default API_BASE_URL when not provided', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ user: mockUser }),
      };

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await loginApi(mockCredentials);

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        'https://localhost:7011/api/v1/auth/csrf',
        expect.any(Object),
      );
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        'https://localhost:7011/api/v1/auth/login',
        expect.any(Object),
      );
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

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await expect(loginApi(mockCredentials)).rejects.toThrow('Invalid username or password');
      expect(loginResponse.json).toHaveBeenCalledTimes(1);
    });

    it('should use status code message when response has no error message', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: false,
        status: 500,
        json: vi.fn().mockResolvedValue({}),
      };

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await expect(loginApi(mockCredentials)).rejects.toThrow(
        'Server error, please try again later',
      );
    });

    it('should throw friendly message when JSON parsing fails', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: false,
        status: 400,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await expect(loginApi(mockCredentials)).rejects.toThrow('Bad request');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);

      await expect(loginApi(mockCredentials)).rejects.toThrow('Network error');
    });

    it('should handle different HTTP error codes', async () => {
      const testCases = [
        { status: 400, expectedError: 'Bad request' },
        { status: 403, expectedError: 'Forbidden' },
        { status: 404, expectedError: 'Not found' },
        { status: 500, expectedError: 'Server error, please try again later' },
      ];

      for (const testCase of testCases) {
        mockFetch.mockClear();

        const csrfResponse = {
          ok: true,
          json: vi.fn().mockResolvedValue({}),
        };

        const loginResponse = {
          ok: false,
          status: testCase.status,
          json: vi.fn().mockResolvedValue({}),
        };

        mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

        await expect(loginApi(mockCredentials)).rejects.toThrow(testCase.expectedError);
      }
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

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await loginApi(mockCredentials);

      // Check CSRF call credentials
      const [, csrfOptions] = mockFetch.mock.calls[0];
      expect(csrfOptions.credentials).toBe('include');

      // Check login call credentials
      const [, loginOptions] = mockFetch.mock.calls[1];
      expect(loginOptions.credentials).toBe('include');
    });

    it('should send correct Content-Type header', async () => {
      const csrfResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };

      const loginResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ user: mockUser }),
      };

      mockFetch.mockResolvedValueOnce(csrfResponse).mockResolvedValueOnce(loginResponse);

      await loginApi(mockCredentials);

      // Check login call headers (CSRF call doesn't have Content-Type)
      const [, loginOptions] = mockFetch.mock.calls[1];
      expect(loginOptions.headers['Content-Type']).toBe('application/json');
    });
  });
});
