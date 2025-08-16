import { LoginCredentials, LoginResponse, User } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api';

class AuthApiError extends Error {
  public status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthApiError('Invalid email or password', 401);
      }
      const errorText = await response.text();
      throw new AuthApiError(`Login failed: ${errorText}`, response.status);
    }

    return await response.json();
  },

  async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new AuthApiError('Unauthorized', 401);
      }
      const errorText = await response.text();
      throw new AuthApiError(`Failed to get user: ${errorText}`, response.status);
    }

    return await response.json();
  },
};