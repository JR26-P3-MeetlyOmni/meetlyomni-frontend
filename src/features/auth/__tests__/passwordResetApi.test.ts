import { beforeEach, describe, expect, it, vi } from 'vitest';

import { requestResetApi } from '../api/requestResetApi';
import { resetPasswordApi } from '../api/resetPasswordApi';
import type { RequestResetCredentials, ResetPasswordCredentials } from '../types';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('passwordResetApi', () => {
  const mockRequestResetCredentials: RequestResetCredentials = {
    email: 'test@example.com',
  };

  const mockResetPasswordCredentials: ResetPasswordCredentials = {
    token: 'valid-token-123',
    newPassword: 'NewPassword123!',
  };

  beforeEach(() => {
    mockFetch.mockClear();
    vi.unstubAllEnvs();
    // Reset environment variable to default
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  describe('requestResetApi', () => {
    it('should make POST request to correct URL with email', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ ok: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await requestResetApi(mockRequestResetCredentials);

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/request-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockRequestResetCredentials),
        signal: undefined,
      });
    });



    it('should return response data on successful request', async () => {
      const expectedResponse = { ok: true };
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(expectedResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await requestResetApi(mockRequestResetCredentials);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw error with message from response on 400', async () => {
      const errorResponse = { error: 'Email not found' };
      const mockResponse = {
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue(errorResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(requestResetApi(mockRequestResetCredentials)).rejects.toThrow('Email not found');
    });

    it('should throw error with message from response on 404', async () => {
      const errorResponse = { message: 'User not found' };
      const mockResponse = {
        ok: false,
        status: 404,
        json: vi.fn().mockResolvedValue(errorResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(requestResetApi(mockRequestResetCredentials)).rejects.toThrow('User not found');
    });

    it('should throw default error when response has no error message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: vi.fn().mockResolvedValue({}),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(requestResetApi(mockRequestResetCredentials)).rejects.toThrow('{}');
    });

    it('should throw friendly message when JSON parsing fails', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(requestResetApi(mockRequestResetCredentials)).rejects.toThrow(
        'Unable to process request. Please try again.',
      );
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);

      await expect(requestResetApi(mockRequestResetCredentials)).rejects.toThrow('Network error');
    });

    it('should forward abort signal', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ ok: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);
      const mockSignal = new AbortController().signal;

      await requestResetApi(mockRequestResetCredentials, mockSignal);

      const [, options] = mockFetch.mock.calls[0];
      expect(options.signal).toBe(mockSignal);
    });
  });

  describe('resetPasswordApi', () => {
    it('should make POST request to correct URL with token and new password', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ ok: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await resetPasswordApi(mockResetPasswordCredentials);

      expect(mockFetch).toHaveBeenCalledWith('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockResetPasswordCredentials),
        signal: undefined,
      });
    });



    it('should return response data on successful reset', async () => {
      const expectedResponse = { ok: true };
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(expectedResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await resetPasswordApi(mockResetPasswordCredentials);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw error with message from response on 400', async () => {
      const errorResponse = { error: 'Invalid token' };
      const mockResponse = {
        ok: false,
        status: 400,
        json: vi.fn().mockResolvedValue(errorResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow('Invalid token');
    });

    it('should throw error with message from response on 401', async () => {
      const errorResponse = { message: 'Token expired' };
      const mockResponse = {
        ok: false,
        status: 401,
        json: vi.fn().mockResolvedValue(errorResponse),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow('Token expired');
    });

    it('should throw default error when response has no error message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: vi.fn().mockResolvedValue({}),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow('{}');
    });

    it('should throw friendly message when JSON parsing fails', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow(
        'Unable to reset password. Please try again.',
      );
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);

      await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow('Network error');
    });

    it('should forward abort signal', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ ok: true }),
      };
      mockFetch.mockResolvedValue(mockResponse);
      const mockSignal = new AbortController().signal;

      await resetPasswordApi(mockResetPasswordCredentials, mockSignal);

      const [, options] = mockFetch.mock.calls[0];
      expect(options.signal).toBe(mockSignal);
    });

    it('should handle different HTTP error codes', async () => {
      const testCases = [
        { status: 400, expectedError: '{}' },
        { status: 401, expectedError: '{}' },
        { status: 403, expectedError: '{}' },
        { status: 404, expectedError: '{}' },
        { status: 500, expectedError: '{}' },
      ];

      for (const testCase of testCases) {
        mockFetch.mockClear();
        const mockResponse = {
          ok: false,
          status: testCase.status,
          json: vi.fn().mockResolvedValue({}),
        };
        mockFetch.mockResolvedValue(mockResponse);

        await expect(resetPasswordApi(mockResetPasswordCredentials)).rejects.toThrow(
          testCase.expectedError,
        );
      }
    });
  });
});
