import { login } from '@/app/api/signin-api';
import { AuthServiceError } from '@/services/authService';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { LoginStatus } from '../types';
import type { FormData, LoginState } from '../types';

export const useSubmitHandler = (
  formData: FormData,
  validateForm: () => boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setLoginState: React.Dispatch<React.SetStateAction<LoginState>>,
) => {
  const router = useRouter();
  return useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setLoginState({
        status: LoginStatus.LOADING,
        error: null,
      });

      try {
        await login({ email: formData.email, password: formData.password });

        setLoginState({ status: LoginStatus.SUCCESS, error: null });
        // Redirect to after login success page
        router.replace('/login/after_login_success_page');
      } catch (error) {
        const errorMessage =
          error instanceof AuthServiceError ? error.message : '登录失败，请稍后重试';

        setLoginState({
          status: LoginStatus.ERROR,
          error: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, setIsLoading, setLoginState, router],
  );
};
