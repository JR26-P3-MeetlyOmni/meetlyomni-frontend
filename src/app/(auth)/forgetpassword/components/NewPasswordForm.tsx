'use client';

import { FormContainer, FormTitle, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';
import { useNewPasswordForm } from '@/features/auth';

import React from 'react';

import { Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import NewPasswordSuccess from '../PasswordUpdateSuccess/page';
import type { NewPasswordFormProps } from '../types';
import PasswordField from './passwordReset/PasswordField';
import PasswordValidation from './passwordReset/PasswordValidation';

const ValidationAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface FormData {
  validation: {
    minLength: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
  password: string;
  showValidation: boolean;
}

const getPasswordValidationProps = (formData: FormData) => ({
  isLengthOk: formData.validation.minLength,
  isCaseOk: formData.validation.hasUpper && formData.validation.hasLower,
  isNumSpecialOk: formData.validation.hasNumber && formData.validation.hasSpecial,
  hasInput: formData.password.length > 0,
  isStrong:
    formData.validation.minLength &&
    formData.validation.hasUpper &&
    formData.validation.hasLower &&
    formData.validation.hasNumber &&
    formData.validation.hasSpecial,
});

const renderPasswordValidation = (formData: FormData) => {
  if (!formData.showValidation) return null;
  return <PasswordValidation {...getPasswordValidationProps(formData)} />;
};

const renderErrorAlert = (resetError: string | null) => {
  if (!resetError) return null;
  return <Alert severity="error">{resetError}</Alert>;
};

const renderValidationAlert = (showValidation: boolean, isValidPassword: boolean) => {
  if (!(showValidation && !isValidPassword)) return null;
  return (
    <ValidationAlert severity="info">
      Please ensure your password meets all the requirements above before proceeding.
    </ValidationAlert>
  );
};

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
  const formData = useNewPasswordForm(token);

  if (formData.success) {
    return <NewPasswordSuccess />;
  }

  const hasPasswordMismatch = formData.confirmPassword.length > 0 && !formData.validation.match;

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      <Box component="form" onSubmit={formData.handleSubmit}>
        <PasswordField
          type="new"
          value={formData.password}
          showPassword={formData.showPassword}
          isSubmitting={formData.isSubmitting}
          onChange={formData.setPassword}
          onToggleVisibility={formData.toggleShowPassword}
        />

        {renderPasswordValidation(formData)}

        <PasswordField
          type="confirm"
          value={formData.confirmPassword}
          showPassword={formData.showConfirmPassword}
          isSubmitting={formData.isSubmitting}
          hasError={hasPasswordMismatch}
          errorMessage="Passwords do not match"
          onChange={formData.setConfirmPassword}
          onToggleVisibility={formData.toggleShowConfirmPassword}
        />

        {renderErrorAlert(formData.resetError)}
        {renderValidationAlert(formData.showValidation, formData.isValidPassword)}

        <StyledSubmitButton type="submit" fullWidth disabled={formData.isSubmitting}>
          {formData.isSubmitting ? 'Resetting...' : 'Reset password'}
        </StyledSubmitButton>
      </Box>
    </FormContainer>
  );
};

export default NewPasswordForm;
