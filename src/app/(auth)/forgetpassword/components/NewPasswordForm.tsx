'use client';

import { FormContainer, FormTitle, StyledSubmitButton } from '@/components/Auth/AuthFormComponents';
import { useNewPasswordForm } from '@/features/auth';

import { Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { NewPasswordFormProps } from '../types';
import NewPasswordSuccess from './NewPasswordSuccess';
import PasswordFormFields from './passwordReset/PasswordFormFields';

const ValidationAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ token }) => {
  const {
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
  } = useNewPasswordForm(token);

  if (success) {
    return <NewPasswordSuccess />;
  }

  return (
    <FormContainer>
      <FormTitle>Reset your password</FormTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <PasswordFormFields
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          isSubmitting={isSubmitting}
          validation={validation}
          showValidation={showValidation}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          toggleShowPassword={toggleShowPassword}
          toggleShowConfirmPassword={toggleShowConfirmPassword}
        />

        {resetError ? <Alert severity="error">{resetError}</Alert> : null}

        {showValidation === true && isValidPassword === false && (
          <ValidationAlert severity="info">
            Please ensure your password meets all the requirements above before proceeding.
          </ValidationAlert>
        )}

        <StyledSubmitButton type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset password'}
        </StyledSubmitButton>
      </Box>
    </FormContainer>
  );
};

export default NewPasswordForm;
