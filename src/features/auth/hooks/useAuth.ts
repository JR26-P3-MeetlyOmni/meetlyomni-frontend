import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearError, initializeAuthAsync, loginAsync, logout } from '../store/authSlice';
import { LoginCredentials } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authState = useAppSelector(state => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      try {
        const result = await dispatch(loginAsync(credentials));

        if (loginAsync.fulfilled.match(result)) {
          router.push('/dashboard');
          return true;
        }

        return false;
      } catch {
        return false;
      }
    },
    [dispatch, router],
  );

  const signOut = useCallback(() => {
    dispatch(logout());
    router.push('/login');
  }, [dispatch, router]);

  const initializeAuth = useCallback(() => {
    dispatch(initializeAuthAsync());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,

    // Actions
    login,
    logout: signOut,
    initializeAuth,
    clearError: clearAuthError,
  };
};
