import { apiFetch, ensureXsrfCookie } from '../../api/api';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginCredentials,
  ResetPasswordRequest,
  ResetPasswordResponse,
  TokenMeta,
  User,
} from './authTypes';
import type { SignupRequest, SignupResponse } from './types';

export const loginApi = async (
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<TokenMeta> => {
  await ensureXsrfCookie();
  return apiFetch<TokenMeta>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    signal,
  });
};

export const getMe = async (signal?: AbortSignal): Promise<User> => {
  interface BackendUserResponse {
    id: string;
    email: string;
    userName: string;
    role: string;
    orgId: string;
  }

  const backendUser = await apiFetch<BackendUserResponse>('/auth/me', { method: 'GET', signal });

  return {
    id: backendUser.id,
    email: backendUser.email,
    name: backendUser.userName,
    role: backendUser.role,
    organizationId: backendUser.orgId,
  };
};

export const logoutApi = async (): Promise<void> => {
  await apiFetch<void>('/auth/logout', { method: 'POST' });
};

export const signup = async (
  signupData: SignupRequest,
  signal?: AbortSignal,
): Promise<SignupResponse> => {
  await ensureXsrfCookie();
  return apiFetch<SignupResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(signupData),
    signal,
  });
};

export const forgotPasswordApi = async (
  request: ForgotPasswordRequest,
  signal?: AbortSignal,
): Promise<ForgotPasswordResponse> => {
  await ensureXsrfCookie();
  return apiFetch<ForgotPasswordResponse>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(request),
    signal,
  });
};

export const resetPasswordApi = async (
  request: ResetPasswordRequest,
  signal?: AbortSignal,
): Promise<ResetPasswordResponse> => {
  await ensureXsrfCookie();
  return apiFetch<ResetPasswordResponse>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(request),
    signal,
  });
};
