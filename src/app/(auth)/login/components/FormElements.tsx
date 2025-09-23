import React from 'react';

import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Error Text Component
const StyledErrorText = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.error.main,
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

interface ErrorTextProps {
  error: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ error }) =>
  error ? <StyledErrorText>{error}</StyledErrorText> : null;

// Sign In Button Component
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

interface SignInButtonProps {
  isLoading: boolean;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ isLoading }) => (
  <StyledSignInButton type="submit" variant="contained" disabled={isLoading}>
    {isLoading ? 'Signing in...' : 'Sign in'}
  </StyledSignInButton>
);
