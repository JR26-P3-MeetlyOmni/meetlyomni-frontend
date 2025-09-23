import { loginThunk } from '@/features/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useFormHandlers = (
  formData: { email: string; password: string },
  handleInputChange: (field: string, value: string) => void,
  handleInputBlur: (field: string, value: string) => void,
) => {
  const dispatch = useAppDispatch();
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
        await dispatch(loginThunk({ email: emailTrim, password: passwordTrim })).unwrap();
        router.push('/dashboard');
      } catch {
        // Error is already handled in Redux and displayed in the UI
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
