import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useCallback, useEffect, useState } from 'react';

import { selectIsResettingPassword, selectPasswordResetError } from '../selectors';
import { clearPasswordResetErrors } from '../slice';
import { resetPasswordThunk } from '../thunks/resetPasswordThunk';
import type { UseNewPasswordFormReturn } from '../types';
import { validatePasswordStrength } from '../utils/passwordValidation';

export function useNewPasswordForm(token: string): UseNewPasswordFormReturn {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const isSubmitting = useAppSelector(selectIsResettingPassword);
  const resetError = useAppSelector(selectPasswordResetError);

  const validation = validatePasswordStrength(password, confirmPassword);
  const isValidPassword =
    validation.minLength &&
    validation.hasUpper &&
    validation.hasLower &&
    validation.hasNumber &&
    validation.hasSpecial &&
    validation.match;

  useEffect(() => {
    if (resetError) dispatch(clearPasswordResetErrors());
  }, [password, confirmPassword, dispatch, resetError]);

  const handleResetSuccess = useCallback(() => {
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }, []);

  const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);
  const toggleShowConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setShowValidation(true);

      if (!isValidPassword) {
        return;
      }

      const result = await dispatch(resetPasswordThunk({ token, newPassword: password }));
      if (resetPasswordThunk.fulfilled.match(result)) handleResetSuccess();
    },
    [dispatch, token, password, isValidPassword, handleResetSuccess],
  );

  return {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    success,
    isSubmitting,
    resetError,
    validation,
    isValidPassword,
    showValidation,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
  };
}
