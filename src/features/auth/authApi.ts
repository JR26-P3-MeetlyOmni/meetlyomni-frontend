import { apiFetch, ensureXsrfCookie } from '../../api/api';
import type { LoginCredentials, TokenMeta, User } from './authTypes';

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
