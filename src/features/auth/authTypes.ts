export type User = {
  id: string;
  organizationId: string;
  email: string;
  name: string;
  role: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type TokenMeta = {
  expiresAt: string;
};

export type AuthError = {
  message: string;
  code: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export type ResetPasswordRequest = {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
  reset: boolean;
};

export type AuthState = {
  user: User | null;
  expiresAt: string | null; // token expiration time
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
};
