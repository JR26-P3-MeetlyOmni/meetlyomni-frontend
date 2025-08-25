'use client';

import React, { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormContainer, FormTitle, StyledTextField, SubmitButton, SectionLabel } from './forms/shared';

import type { EmailRequestFormProps } from '../types';

const StyledSectionLabel = styled(SectionLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledSubmitButton = styled(SubmitButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const EmailRequestForm: React.FC<EmailRequestFormProps> = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setError('');
    setSuccess(false);

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      
      {success ? (
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
            error={!!error}
            helperText={error}
            disabled={isSubmitting}
            placeholder="Input Your Email Address"
          />
          
          <StyledSubmitButton
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </StyledSubmitButton>
        </Box>
      )}
    </FormContainer>
  );
};

export default EmailRequestForm;