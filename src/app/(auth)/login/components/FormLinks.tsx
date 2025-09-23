import React from 'react';

import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  marginBottom: theme.spacing(2),
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

const StyledBackToHomeBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledBackToHomeLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.light || theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
  whiteSpace: 'nowrap',
}));

export const ForgotPasswordLink: React.FC = () => (
  <StyledForgotPasswordBox>
    <StyledForgotPasswordLink href="/forgot-password">Forgot Password?</StyledForgotPasswordLink>
  </StyledForgotPasswordBox>
);

export const SignUpLink: React.FC = () => (
  <StyledSignUpBox>
    <StyledSignUpText>Don&apos;t have an account?</StyledSignUpText>
    <StyledSignUpLink href="/signup">Sign up</StyledSignUpLink>
  </StyledSignUpBox>
);

export const BackToHomeLink: React.FC = () => (
  <StyledBackToHomeBox>
    <StyledBackToHomeLink href="/">Back to home</StyledBackToHomeLink>
  </StyledBackToHomeBox>
);
