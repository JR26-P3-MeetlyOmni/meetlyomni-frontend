import { RootState } from '@/store/store';

import { AuthState } from './authTypes';

export const selectAuth = (s: RootState) => s.auth as AuthState;
export const selectUser = (s: RootState) => (s.auth as AuthState).user;
export const selectIsAuthenticated = (s: RootState) => Boolean((s.auth as AuthState).user);
export const selectAuthLoading = (s: RootState) => (s.auth as AuthState).isLoading;
export const selectAuthError = (s: RootState) => (s.auth as AuthState).error;
export const selectExpiresAt = (s: RootState) => (s.auth as AuthState).expiresAt;
