import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { AUTH_ROUTES } from '../constants/routes';
import { loginAsync } from '../store/authThunks';
import { LoginCredentials } from '../types';

/**
 * Hook for login action with navigation
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      try {
        const result = await dispatch(loginAsync(credentials));

        if (loginAsync.fulfilled.match(result)) {
          router.push(AUTH_ROUTES.DASHBOARD);
          return true;
        }

        return false;
      } catch {
        return false;
      }
    },
    [dispatch, router],
  );

  return { login };
};
