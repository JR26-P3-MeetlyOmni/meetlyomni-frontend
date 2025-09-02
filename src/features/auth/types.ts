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

// Hook return types
export interface UseNewPasswordFormReturn {
  // Form state
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  success: boolean;

  // Redux state
  isSubmitting: boolean;
  resetError: string | null;

  // Password validation
  validation: PasswordValidation;
  isValidPassword: boolean;
  showValidation: boolean;

  // Event handlers
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}
