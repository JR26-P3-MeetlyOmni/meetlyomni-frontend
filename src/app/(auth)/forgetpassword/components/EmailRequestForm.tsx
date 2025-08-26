'use client';

import React from 'react';
import { Box, Alert } from '@mui/material';
import { FormContainer, FormTitle, StyledTextField, StyledSectionLabel, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';
import { useEmailRequestForm } from '@/features/auth';

const EmailRequestForm: React.FC = () => {
  const {
    email,
    emailSent,
    isSubmitting,
    displayError,
    handleEmailChange,
    handleSubmit,
  } = useEmailRequestForm();

  if (emailSent) {
    return (
      <FormContainer>
        <FormTitle>Reset your password</FormTitle>
        <Alert severity="success">
          Password reset link has been sent to your email. Please check your inbox.
        </Alert>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <StyledSectionLabel>Email</StyledSectionLabel>
        <StyledTextField
          fullWidth
          size="small"
          type="email"
          value={email}
          onChange={handleEmailChange}
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
    </FormContainer>
  );
};

export default EmailRequestForm;