export interface User {
  id: string;
  organizationId: string;
  organizationCode: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

export interface AuthError {
  message: string;
  status?: number;
}