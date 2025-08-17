import { describe, expect, it, vi, beforeEach } from 'vitest';

import { authApi, AuthApiError } from './authApi';
import { apiClient } from './apiClient';
import { AUTH_MESSAGES } from '../constants/messages';
import { LoginCredentials, User } from '../types';

// Mock apiClient
vi.mock('./apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
  AuthApiError: class AuthApiError extends Error {
    constructor(message: string, public status?: number) {
      super(message);
      this.name = 'AuthApiError';
    }
  },
}));

// Mock data
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

const mockLoginResponse = {
  user: mockUser,
  message: 'Login successful',
};

describe('authApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    describe('when login succeeds', () => {
      it('should call apiClient.post with correct parameters', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(mockLoginResponse);

        const result = await authApi.login(mockCredentials);

        expect(apiClient.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
        expect(result).toEqual(mockLoginResponse);
      });

      it('should return user data and message', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(mockLoginResponse);

        const result = await authApi.login(mockCredentials);

        expect(result.user).toEqual(mockUser);
        expect(result.message).toBe('Login successful');
      });
    });

    describe('when login fails with 401', () => {
      it('should throw AuthApiError with LOGIN_FAILED message', async () => {
        const originalError = new AuthApiError('Invalid credentials', 401);
        vi.mocked(apiClient.post).mockRejectedValue(originalError);

        await expect(authApi.login(mockCredentials)).rejects.toThrow(AuthApiError);
        await expect(authApi.login(mockCredentials)).rejects.toThrow(AUTH_MESSAGES.LOGIN_FAILED);
        
        const error = await authApi.login(mockCredentials).catch(e => e);
        expect(error.status).toBe(401);
      });
    });

    describe('when login fails with other errors', () => {
      it('should rethrow non-401 AuthApiError', async () => {
        const originalError = new AuthApiError('Server error', 500);
        vi.mocked(apiClient.post).mockRejectedValue(originalError);

        await expect(authApi.login(mockCredentials)).rejects.toThrow('Server error');
      });

      it('should rethrow non-AuthApiError', async () => {
        const originalError = new Error('Network error');
        vi.mocked(apiClient.post).mockRejectedValue(originalError);

        await expect(authApi.login(mockCredentials)).rejects.toThrow('Network error');
      });
    });

    describe('edge cases', () => {
      it('should handle empty credentials', async () => {
        const emptyCredentials = { email: '', password: '' };
        vi.mocked(apiClient.post).mockResolvedValue(mockLoginResponse);

        await authApi.login(emptyCredentials);

        expect(apiClient.post).toHaveBeenCalledWith('/auth/login', emptyCredentials);
      });

      it('should handle special characters in credentials', async () => {
        const specialCredentials = {
          email: 'test+tag@example.com',
          password: 'P@ssw0rd!@#$',
        };
        vi.mocked(apiClient.post).mockResolvedValue(mockLoginResponse);

        await authApi.login(specialCredentials);

        expect(apiClient.post).toHaveBeenCalledWith('/auth/login', specialCredentials);
      });
    });
  });

  describe('getCurrentUser', () => {
    describe('when getCurrentUser succeeds', () => {
      it('should call apiClient.get with correct endpoint', async () => {
        vi.mocked(apiClient.get).mockResolvedValue(mockUser);

        const result = await authApi.getCurrentUser();

        expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
        expect(result).toEqual(mockUser);
      });

      it('should return complete user data', async () => {
        vi.mocked(apiClient.get).mockResolvedValue(mockUser);

        const result = await authApi.getCurrentUser();

        expect(result.id).toBe('1');
        expect(result.email).toBe('test@example.com');
        expect(result.fullName).toBe('Test User');
        expect(result.role).toBe('user');
        expect(result.organizationId).toBe('org-1');
      });
    });

    describe('when getCurrentUser fails with 401', () => {
      it('should throw AuthApiError with UNAUTHORIZED message', async () => {
        const originalError = new AuthApiError('Token expired', 401);
        vi.mocked(apiClient.get).mockRejectedValue(originalError);

        await expect(authApi.getCurrentUser()).rejects.toThrow(AuthApiError);
        await expect(authApi.getCurrentUser()).rejects.toThrow(AUTH_MESSAGES.UNAUTHORIZED);
        
        const error = await authApi.getCurrentUser().catch(e => e);
        expect(error.status).toBe(401);
      });
    });

    describe('when getCurrentUser fails with other AuthApiError', () => {
      it('should throw AuthApiError with GET_USER_FAILED message', async () => {
        const originalError = new AuthApiError('Server error', 500);
        vi.mocked(apiClient.get).mockRejectedValue(originalError);

        await expect(authApi.getCurrentUser()).rejects.toThrow(AuthApiError);
        await expect(authApi.getCurrentUser()).rejects.toThrow(AUTH_MESSAGES.GET_USER_FAILED);
        
        const error = await authApi.getCurrentUser().catch(e => e);
        expect(error.status).toBe(500);
      });
    });

    describe('when getCurrentUser fails with non-AuthApiError', () => {
      it('should rethrow the original error', async () => {
        const originalError = new Error('Network timeout');
        vi.mocked(apiClient.get).mockRejectedValue(originalError);

        await expect(authApi.getCurrentUser()).rejects.toThrow('Network timeout');
      });
    });
  });

  describe('logout', () => {
    describe('when logout succeeds', () => {
      it('should call apiClient.post with correct parameters', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(undefined);

        await authApi.logout();

        expect(apiClient.post).toHaveBeenCalledWith('/auth/logout', {});
      });

      it('should complete without throwing', async () => {
        vi.mocked(apiClient.post).mockResolvedValue(undefined);

        await expect(authApi.logout()).resolves.toBeUndefined();
      });
    });

    describe('when logout fails', () => {
      it('should not throw error on AuthApiError', async () => {
        const error = new AuthApiError('Logout failed', 500);
        vi.mocked(apiClient.post).mockRejectedValue(error);

        // Mock console.error to verify it's called
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        await expect(authApi.logout()).resolves.toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Logout API error:', error);
        
        consoleSpy.mockRestore();
      });

      it('should not throw error on network error', async () => {
        const error = new Error('Network error');
        vi.mocked(apiClient.post).mockRejectedValue(error);

        // Mock console.error to verify it's called
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        await expect(authApi.logout()).resolves.toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Logout API error:', error);
        
        consoleSpy.mockRestore();
      });

      it('should handle undefined/null errors gracefully', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(null);

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        await expect(authApi.logout()).resolves.toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith('Logout API error:', null);
        
        consoleSpy.mockRestore();
      });
    });
  });

  describe('integration scenarios', () => {
    it('should handle sequential API calls correctly', async () => {
      // Login first
      vi.mocked(apiClient.post).mockResolvedValueOnce(mockLoginResponse);
      const loginResult = await authApi.login(mockCredentials);
      expect(loginResult).toEqual(mockLoginResponse);

      // Get current user
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockUser);
      const userResult = await authApi.getCurrentUser();
      expect(userResult).toEqual(mockUser);

      // Logout
      vi.mocked(apiClient.post).mockResolvedValueOnce(undefined);
      await authApi.logout();
      
      expect(apiClient.post).toHaveBeenCalledTimes(2); // login + logout
      expect(apiClient.get).toHaveBeenCalledTimes(1); // getCurrentUser
    });

    it('should handle error recovery scenarios', async () => {
      // Failed login followed by successful login
      vi.mocked(apiClient.post)
        .mockRejectedValueOnce(new AuthApiError('Invalid credentials', 401))
        .mockResolvedValueOnce(mockLoginResponse);

      await expect(authApi.login(mockCredentials)).rejects.toThrow(AUTH_MESSAGES.LOGIN_FAILED);
      
      const result = await authApi.login(mockCredentials);
      expect(result).toEqual(mockLoginResponse);
    });
  });
});
