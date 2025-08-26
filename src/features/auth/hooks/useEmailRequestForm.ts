import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestResetThunk } from '../thunks/requestResetThunk';
import { clearPasswordResetErrors } from '../slice';
import { selectIsRequestingReset, selectEmailSent, selectPasswordResetRequestError } from '../selectors';
import { validateEmail } from '../utils/validation';

/**
 * Custom hook for email request form logic
 * Handles all business logic, state management, and event handling
 */
export function useEmailRequestForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  // Redux state
  const isSubmitting = useAppSelector(selectIsRequestingReset);
  const emailSent = useAppSelector(selectEmailSent);
  const requestError = useAppSelector(selectPasswordResetRequestError);

  // Memoized callbacks to avoid inline functions
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  // Clear errors when email changes
  useEffect(() => {
    if (validationError) {
      setValidationError('');
    }
    if (requestError) {
      dispatch(clearPasswordResetErrors());
    }
  }, [email, dispatch, validationError, requestError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset validation error
    setValidationError('');

    // Client-side validation
    if (!email) {
      setValidationError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    // Dispatch thunk
    const result = await dispatch(requestResetThunk({ email }));
    
    // Clear email field on success
    if (requestResetThunk.fulfilled.match(result)) {
      setEmail('');
    }
  }, [email, dispatch]);

  const displayError = validationError || requestError;

  return {
    // Form state
    email,
    emailSent,
    isSubmitting,
    displayError,
    // Event handlers
    handleEmailChange,
    handleSubmit,
  } as const;
}
