'use client';

import {
  FormContainer,
  FormTitle,
  StyledSectionLabel,
  StyledSubmitButton,
  StyledTextField,
} from '@/components/Auth/AuthFormComponents';
import { useEmailRequestForm } from '@/features/auth';

import React from 'react';

import { Box } from '@mui/material';

import EmailRequestSuccess from '../EmailSentSuccess/page';

const EmailRequestForm: React.FC = () => {
  const { email, emailSent, isSubmitting, displayError, handleEmailChange, handleSubmit } =
    useEmailRequestForm();

  if (emailSent) {
    return <EmailRequestSuccess />;
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

        <StyledSubmitButton type="submit" fullWidth disabled={isSubmitting || !email}>
          {isSubmitting ? 'Sending...' : 'Submit'}
        </StyledSubmitButton>
      </Box>
    </FormContainer>
  );
};

export default EmailRequestForm;