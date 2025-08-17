import { AUTH_MESSAGES } from '../constants/messages';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api';

export class AuthApiError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

/**
 * Unified fetch client for auth API calls with error handling
 */
export const apiClient = {
  async post<T>(endpoint: string, data: unknown, isRetry = false): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include httpOnly cookies
      body: JSON.stringify(data),
    });

    // Handle token refresh on 401 (only once to prevent infinite recursion)
    if (response.status === 401 && !isRetry && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
      const refreshed = await this.tryRefreshToken();
      if (refreshed) {
        // Retry original request (mark as retry to prevent infinite loop)
        return this.post(endpoint, data, true);
      }
    }

    if (!response.ok) {
      await this.handleError(response);
    }

    return await response.json();
  },

  async get<T>(endpoint: string, isRetry = false): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include httpOnly cookies
    });

    // Handle token refresh on 401 (only once to prevent infinite recursion)
    if (response.status === 401 && !isRetry) {
      const refreshed = await this.tryRefreshToken();
      if (refreshed) {
        // Retry original request (mark as retry to prevent infinite loop)
        return this.get(endpoint, true);
      }
    }

    if (!response.ok) {
      await this.handleError(response);
    }

    return await response.json();
  },

  async tryRefreshToken(): Promise<boolean> {
    try {
      const { tokenStorage } = await import('../services/tokenStorage');
      return await tokenStorage.refresh();
    } catch {
      return false;
    }
  },

  async handleError(response: Response): Promise<never> {
    if (response.status === 401) {
      throw new AuthApiError(AUTH_MESSAGES.UNAUTHORIZED, 401);
    }

    try {
      const errorText = await response.text();
      throw new AuthApiError(`Request failed: ${errorText}`, response.status);
    } catch {
      throw new AuthApiError(AUTH_MESSAGES.NETWORK_ERROR, response.status);
    }
  },
};
