export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Forget Password related types
export interface RequestResetCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface PasswordValidation {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  match: boolean;
}

export interface PasswordResetState {
  emailSent: boolean;
  isRequestingReset: boolean;
  isResettingPassword: boolean;
  requestError: string | null;
  resetError: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  passwordReset: PasswordResetState;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}
