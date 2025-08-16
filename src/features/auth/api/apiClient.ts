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
  async post<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return await response.json();
  },

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return await response.json();
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
