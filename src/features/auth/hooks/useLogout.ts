import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { AUTH_ROUTES } from '../constants/routes';
import { logoutAsync } from '../store/authThunks';

/**
 * Hook for logout action with navigation
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      // Use async logout to clear httpOnly cookies
      await dispatch(logoutAsync()).unwrap();
      router.push(AUTH_ROUTES.LOGIN);
    } catch (error) {
      // Even if logout API fails, redirect to login
      console.error('Logout error:', error);
      router.push(AUTH_ROUTES.LOGIN);
    }
  }, [dispatch, router]);

  return { logout: signOut };
};
