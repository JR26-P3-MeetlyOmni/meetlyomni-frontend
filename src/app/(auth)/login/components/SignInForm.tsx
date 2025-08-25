import React, { useCallback } from 'react';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledErrorText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.error.main,
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.75),
  textAlign: 'left',
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'hasError',
})<{ hasError: boolean }>(({ hasError, theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': { display: 'none' },
  '& .MuiInputBase-input': { ...theme.typography.body2 },
  marginBottom: theme.spacing(1),
}));

const StyledForgotPasswordBox = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(2),
}));

const StyledForgotPasswordLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.light || theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}));

const StyledSignUpBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const StyledSignUpText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
}));

const StyledSignUpLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.light || theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
  whiteSpace: 'nowrap',
}));

const StyledSignInButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 38,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.grey[900],
  textTransform: 'none',
  fontFamily: theme.typography.button.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  fontSize: theme.typography.button.fontSize,
  lineHeight: theme.typography.button.lineHeight,
  letterSpacing: theme.typography.button.letterSpacing,
  color: theme.palette.primary.contrastText,
  '&:hover': { backgroundColor: theme.palette.grey[900] },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
  },
}));

const StyledFormBox = styled('form')({
  maxWidth: 412,
  margin: '0 auto',
});

interface SignInFormProps {
  formData: { email: string; password: string };
  errors: { email: string; password: string };
  isSubmitting: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleInputBlur: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Error text component
interface ErrorTextProps {
  error: string;
}
const ErrorText = ({ error }: ErrorTextProps) =>
  error ? <StyledErrorText>{error}</StyledErrorText> : null;

// EmailInput only receives error boolean
interface EmailInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const EmailInput = ({ value, hasError, onChange, onBlur }: EmailInputProps) => (
  <>
    <StyledLabel>Email</StyledLabel>
    <StyledTextField
      required
      fullWidth
      id="email"
      name="email"
      autoComplete="email"
      autoFocus
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      placeholder="Email Address"
      hasError={hasError}
    />
  </>
);

// PasswordInput only receives error boolean
interface PasswordInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const PasswordInput = ({ value, hasError, onChange, onBlur }: PasswordInputProps) => (
  <>
    <StyledLabel>Password</StyledLabel>
    <StyledTextField
      required
      fullWidth
      name="password"
      type="password"
      id="password"
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      placeholder="Password"
      hasError={hasError}
    />
  </>
);

// Forgot password link component
const ForgotPasswordLink = () => (
  <StyledForgotPasswordBox>
    <StyledForgotPasswordLink href="/forgot-password">Forgot Password?</StyledForgotPasswordLink>
  </StyledForgotPasswordBox>
);

// Sign up link component
const SignUpLink = () => (
  <StyledSignUpBox>
    <StyledSignUpText>Don&apos;t have an account?</StyledSignUpText>
    <StyledSignUpLink href="/signup">Sign up</StyledSignUpLink>
  </StyledSignUpBox>
);

// Sign in button component
interface SignInButtonProps {
  isSubmitting: boolean;
}
const SignInButton = ({ isSubmitting }: SignInButtonProps) => (
  <StyledSignInButton type="submit" variant="contained" disabled={isSubmitting}>
    {isSubmitting ? 'Signing in...' : 'Sign in'}
  </StyledSignInButton>
);

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  isSubmitting,
  handleInputChange,
  handleInputBlur,
  handleSubmit,
}) => {
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value),
    [handleInputChange],
  );
  const handleEmailBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => handleInputBlur('email', e.target.value),
    [handleInputBlur],
  );
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value),
    [handleInputChange],
  );
  const handlePasswordBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => handleInputBlur('password', e.target.value),
    [handleInputBlur],
  );
  const emailError = typeof errors.email === 'string' ? errors.email : '';
  const passwordError = typeof errors.password === 'string' ? errors.password : '';
  const emailHasError = emailError.length > 0;
  const passwordHasError = passwordError.length > 0;
  return (
    <StyledFormBox onSubmit={handleSubmit}>
      <EmailInput
        value={formData.email}
        hasError={emailHasError}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
      />
      <ErrorText error={emailError} />
      <PasswordInput
        value={formData.password}
        hasError={passwordHasError}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
      />
      <ErrorText error={passwordError} />
      <ForgotPasswordLink />
      <SignInButton isSubmitting={isSubmitting} />
      <SignUpLink />
    </StyledFormBox>
  );
};
