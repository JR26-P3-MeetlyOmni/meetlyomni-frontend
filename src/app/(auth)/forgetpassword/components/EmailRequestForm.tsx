'use client';

import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import { FormContainer, FormTitle, StyledTextField, StyledSectionLabel, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { requestResetThunk } from '@/features/auth/thunks/requestResetThunk';
import { clearPasswordResetErrors } from '@/features/auth/slice';
import { selectIsRequestingReset, selectEmailSent, selectPasswordResetRequestError } from '@/features/auth/selectors';
import { validateEmail } from '@/features/auth/utils/validation';

import type { EmailRequestFormProps } from '../types';

const EmailRequestForm: React.FC<EmailRequestFormProps> = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  // Redux state
  const isSubmitting = useAppSelector(selectIsRequestingReset);
  const emailSent = useAppSelector(selectEmailSent);
  const requestError = useAppSelector(selectPasswordResetRequestError);

  // Clear errors when component unmounts or email changes
  useEffect(() => {
    if (validationError) {
      setValidationError('');
    }
    if (requestError) {
      dispatch(clearPasswordResetErrors());
    }
  }, [email, dispatch, validationError, requestError]);

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const displayError = validationError || requestError;

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      
      {emailSent ? (
        <Alert severity="success">
          Password reset link has been sent to your email. Please check your inbox.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <StyledSectionLabel>Email</StyledSectionLabel>
          <StyledTextField
            fullWidth
            size="small"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!displayError}
            helperText={displayError}
            disabled={isSubmitting}
            placeholder="Input Your Email Address"
          />
          
          <StyledSubmitButton
            type="submit"
            fullWidth
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </StyledSubmitButton>
        </Box>
      )}
    </FormContainer>
  );
};

export default EmailRequestForm;