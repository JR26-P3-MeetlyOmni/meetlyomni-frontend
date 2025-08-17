import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearError } from '../store/authSlice';
import { initializeAuthAsync } from '../store/authThunks';
import { selectAuthState, selectIsInitialized } from '../store/selectors';

/**
 * Main auth hook for state access and basic operations
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const isInitialized = useAppSelector(selectIsInitialized);

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
    isInitialized, // 🆕 暴露 isInitialized 状态
    error: authState.error,

    // Actions
    initializeAuth,
    clearError: clearAuthError,
  };
};
