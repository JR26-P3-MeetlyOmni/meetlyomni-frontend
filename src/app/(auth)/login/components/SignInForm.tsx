import { selectError, selectIsLoading } from '@/features/auth/authSelectors';
import { useAppSelector, useFormHandlers } from '@/store/hooks';

import React from 'react';

import { styled } from '@mui/material/styles';

import { ErrorText, SignInButton } from './FormElements';
import { EmailInput, PasswordInput } from './FormInputs';
import { BackToHomeLink, ForgotPasswordLink, SignUpLink } from './FormLinks';

const StyledFormBox = styled('form')({
  maxWidth: 412,
  margin: '0 auto',
});

interface SignInFormProps {
  formData: { email: string; password: string };
  errors: { email: string; password: string };
  handleInputChange: (field: string, value: string) => void;
  handleInputBlur: (field: string, value: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleInputBlur,
}) => {
  const isLoading = useAppSelector(selectIsLoading);
  const reduxError = useAppSelector(selectError);

  const {
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleSubmit,
  } = useFormHandlers(formData, handleInputChange, handleInputBlur);

  const emailError = typeof errors.email === 'string' ? errors.email : '';
  const passwordError = typeof errors.password === 'string' ? errors.password : '';

  return (
    <StyledFormBox onSubmit={handleSubmit}>
      <EmailInput
        value={formData.email}
        hasError={!!emailError}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
      />
      <ErrorText error={emailError} />

      <PasswordInput
        value={formData.password}
        hasError={!!passwordError}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
      />
      <ErrorText error={passwordError} />

      {reduxError ? <ErrorText error={reduxError} /> : null}

      <ForgotPasswordLink />
      <SignInButton isLoading={isLoading} />
      <SignUpLink />
      <BackToHomeLink />
    </StyledFormBox>
  );
};
