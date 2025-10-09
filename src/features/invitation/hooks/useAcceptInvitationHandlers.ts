import { fetchMe } from '@/features/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { acceptInvitation } from '../invitationSlice';

export const useAcceptInvitationHandlers = (
  formData: { email: string; password: string; token: string },
  handleInputChange: (field: string, value: string) => void,
  handleInputBlur: (field: string, value: string) => void,
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      setIsSubmitting(true);
      try {
        await dispatch(
          acceptInvitation({
            email: emailTrim,
            password: passwordTrim,
            token: formData.token,
          }),
        ).unwrap();

        await dispatch(fetchMe()).unwrap();

        router.push('/dashboard');
      } catch {
        // Error is already handled in Redux and displayed in the UI
      } finally {
        setIsSubmitting(false);
      }
    },
    [dispatch, formData.email, formData.password, formData.token, router],
  );

  return {
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleSubmit,
    isSubmitting,
  };
};
