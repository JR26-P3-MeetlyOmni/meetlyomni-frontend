import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useCallback, useEffect, useState } from 'react';

import {
  selectEmailSent,
  selectIsRequestingReset,
  selectPasswordResetRequestError,
} from '../selectors';
import { clearPasswordResetErrors } from '../slice';
import { requestResetThunk } from '../thunks/requestResetThunk';
import { validateEmail } from '../utils/emailValidation';

export function useEmailRequestForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const isSubmitting = useAppSelector(selectIsRequestingReset);
  const emailSent = useAppSelector(selectEmailSent);
  const requestError = useAppSelector(selectPasswordResetRequestError);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  useEffect(() => {
    if (validationError) {
      setValidationError('');
    }
    if (requestError) {
      dispatch(clearPasswordResetErrors());
    }
  }, [email, dispatch, validationError, requestError]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setValidationError('');

      if (!email) {
        setValidationError('Email is required');
        return;
      }

      if (!validateEmail(email)) {
        setValidationError('Please enter a valid email address');
        return;
      }

      const result = await dispatch(requestResetThunk({ email }));

      if (requestResetThunk.fulfilled.match(result)) {
        setEmail('');
      }
    },
    [email, dispatch],
  );

  const displayError = validationError || requestError;

  return {
    email,
    emailSent,
    isSubmitting,
    displayError,
    handleEmailChange,
    handleSubmit,
  } as const;
}
