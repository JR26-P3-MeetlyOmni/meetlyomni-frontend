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

export type AuthState = {
  user: User | null;
  expiresAt: string | null; // token expiration time
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
};
