import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { AUTH_ROUTES } from '../constants/routes';
import { logout } from '../store/authSlice';

/**
 * Hook for logout action with navigation
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOut = useCallback(() => {
    dispatch(logout());
    router.push(AUTH_ROUTES.LOGIN);
  }, [dispatch, router]);

  return { logout: signOut };
};
