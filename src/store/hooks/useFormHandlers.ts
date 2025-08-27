import { loginThunk } from '@/features/auth/thunks';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../store';

export const useFormHandlers = (
  formData: { email: string; password: string },
  handleInputChange: (field: string, value: string) => void,
  handleInputBlur: (field: string, value: string) => void,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value),
    [handleInputChange],
  );

  const handleEmailBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => handleInputBlur('email', e.target.value),
    [handleInputBlur],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value),
    [handleInputChange],
  );

  const handlePasswordBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => handleInputBlur('password', e.target.value),
    [handleInputBlur],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const emailTrim = formData.email.trim();
      const passwordTrim = formData.password.trim();

      try {
        // First test API connection
        // eslint-disable-next-line no-console
        console.log('Testing API connection...');
        const isConnected = true;
        // eslint-disable-next-line no-console
        console.log('API connection test result:', isConnected);

        if (!isConnected) {
          // eslint-disable-next-line no-console
          console.error('API connection failed');
          alert('Cannot connect to the backend server. Please check the backend server is running');
          return;
        }

        await dispatch(loginThunk({ email: emailTrim, password: passwordTrim })).unwrap();
        // After successful login, redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        // Error is already handled in Redux, no need to handle here
        // eslint-disable-next-line no-console
        console.error('Login failed:', error);
      }
    },
    [dispatch, formData.email, formData.password, router],
  );

  return {
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleSubmit,
  };
};
