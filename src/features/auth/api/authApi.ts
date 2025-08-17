import { AUTH_MESSAGES } from '../constants/messages';
import { LoginCredentials, LoginResponse, User } from '../types';
import { apiClient, AuthApiError } from './apiClient';

/**
 * Authentication API endpoints
 */
export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      return await apiClient.post<LoginResponse>('/auth/login', credentials);
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 401) {
        throw new AuthApiError(AUTH_MESSAGES.LOGIN_FAILED, 401);
      }
      throw error;
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      return await apiClient.get<User>('/auth/me');
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 401) {
        throw new AuthApiError(AUTH_MESSAGES.UNAUTHORIZED, 401);
      }
      if (error instanceof AuthApiError) {
        throw new AuthApiError(AUTH_MESSAGES.GET_USER_FAILED, error.status);
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      // Logout errors are typically not critical
      console.error('Logout API error:', error);
    }
  },
};

export { AuthApiError } from './apiClient';
