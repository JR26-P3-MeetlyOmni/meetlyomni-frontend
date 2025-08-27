import { FormContainer, FormTitle } from '@/components/Auth/AuthFormComponents';

import React from 'react';

import { Alert } from '@mui/material';

/**
 * EmailRequestSuccess Component
 *
 * Pure UI component that displays the success message
 * when password reset email has been sent successfully.
 */
const EmailRequestSuccess: React.FC = () => {
  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      <Alert severity="success">
        Password reset link has been sent to your email. Please check your inbox.
      </Alert>
    </FormContainer>
  );
};

export default EmailRequestSuccess;
