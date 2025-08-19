import React, { useCallback } from 'react';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

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
  theme: Theme;
}
const ErrorText = ({ error, theme }: ErrorTextProps) =>
  error ? (
    <Typography
      variant="caption"
      sx={{
        ...theme.typography.caption,
        color: theme.palette.error.main,
        mt: theme.spacing(0.5),
        mb: theme.spacing(1),
        textAlign: 'left',
      }}
    >
      {error}
    </Typography>
  ) : null;

// EmailInput only receives error boolean
interface EmailInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  theme: Theme;
}
const EmailInput = ({ value, hasError, onChange, onBlur, theme }: EmailInputProps) => (
  <>
    <Typography
      variant="body2"
      sx={{
        ...theme.typography.body2,
        color: theme.palette.text.primary,
        mb: theme.spacing(0.75),
        textAlign: 'left',
      }}
    >
      Email
    </Typography>
    <TextField
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
      sx={{
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
        mb: theme.spacing(1),
      }}
    />
  </>
);

// PasswordInput only receives error boolean
interface PasswordInputProps {
  value: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  theme: Theme;
}
const PasswordInput = ({ value, hasError, onChange, onBlur, theme }: PasswordInputProps) => (
  <>
    <Typography
      variant="body2"
      sx={{
        ...theme.typography.body2,
        color: theme.palette.text.primary,
        mb: theme.spacing(0.75),
        textAlign: 'left',
      }}
    >
      Password
    </Typography>
    <TextField
      required
      fullWidth
      name="password"
      type="text"
      id="password"
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={hasError}
      placeholder="Password"
      sx={{
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
        mb: theme.spacing(1),
      }}
    />
  </>
);

// Forgot password link component
interface ForgotPasswordLinkProps {
  theme: Theme;
}
const ForgotPasswordLink = ({ theme }: ForgotPasswordLinkProps) => (
  <Box sx={{ textAlign: 'left', mb: theme.spacing(2) }}>
    <Link
      href="/forgot-password"
      variant="body2"
      sx={{
        ...theme.typography.body2,
        color: theme.palette.primary.light || theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      Forgot Password?
    </Link>
  </Box>
);

// Sign up link component
interface SignUpLinkProps {
  theme: Theme;
}
const SignUpLink = ({ theme }: SignUpLinkProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1),
    }}
  >
    <Typography
      variant="body2"
      sx={{
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
      }}
    >
      Don&apos;t have an account?
    </Typography>
    <Link
      href="/signup"
      sx={{
        ...theme.typography.body2,
        color: theme.palette.primary.light || theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': { textDecoration: 'underline' },
        whiteSpace: 'nowrap',
      }}
    >
      Sign up
    </Link>
  </Box>
);

// Sign in button component
interface SignInButtonProps {
  isSubmitting: boolean;
  theme: Theme;
}
const SignInButton = ({ isSubmitting, theme }: SignInButtonProps) => (
  <Button
    type="submit"
    variant="contained"
    disabled={isSubmitting}
    sx={{
      width: '100%',
      height: 38,
      my: theme.spacing(2),
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
    }}
  >
    {isSubmitting ? 'Signing in...' : 'Sign in'}
  </Button>
);

export const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  errors,
  isSubmitting,
  handleInputChange,
  handleInputBlur,
  handleSubmit,
}) => {
  const theme = useTheme();
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 412, mx: 'auto' }}>
      <EmailInput
        value={formData.email}
        hasError={emailHasError}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        theme={theme}
      />
      <ErrorText error={emailError} theme={theme} />
      <PasswordInput
        value={formData.password}
        hasError={passwordHasError}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        theme={theme}
      />
      <ErrorText error={passwordError} theme={theme} />
      <ForgotPasswordLink theme={theme} />
      <SignInButton isSubmitting={isSubmitting} theme={theme} />
      <SignUpLink theme={theme} />
    </Box>
  );
};
