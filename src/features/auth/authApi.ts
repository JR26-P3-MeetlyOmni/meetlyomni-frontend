import { apiFetch, ensureXsrfCookie } from '../../api/api';
import type { LoginCredentials, TokenMeta, User } from './authTypes';
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
  return apiFetch<User>('/auth/me', { method: 'GET', signal });
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
