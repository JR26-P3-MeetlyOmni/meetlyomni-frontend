export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

// Types for the signup request and response
export interface SignupRequest {
  userName: string;
  email: string;
  password: string;
  organizationName: string;
  phoneNumber: string;
}

export interface SignupResponse {
  success: true;
  message: string;
  data?: {
    userId: string;
    companyId: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}
