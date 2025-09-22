'use client';

import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  marginTop: theme.spacing(12.5),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(18.75),
  },
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(25),
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(31.25),
  },
}));

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledTitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  flexDirection: 'column',
  [theme.breakpoints.up(900)]: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
}));

const StyledWelcomeTitle = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  margin: 0,
})) as typeof Typography;

const StyledSignInTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  margin: 0,
})) as typeof Typography;

const SignInTitle: React.FC = () => (
  <StyledTitleContainer>
    <StyledTitleWrapper>
      <StyledWelcomeTitle variant="h4" component="h1">
        Welcome to Omni!
      </StyledWelcomeTitle>
      <StyledSignInTitle variant="h5" component="h2">
        Let&apos;s Sign in Your Profile
      </StyledSignInTitle>
    </StyledTitleWrapper>
  </StyledTitleContainer>
);

interface StyledLoginPageProps {
  decorativeElements: React.ReactNode;
  signInForm: React.ReactNode;
}

export const StyledLoginPage: React.FC<StyledLoginPageProps> = ({
  decorativeElements,
  signInForm,
}) => (
  <StyledPageContainer>
    {decorativeElements}
    <StyledContentContainer maxWidth="sm">
      <SignInTitle />
      {signInForm}
    </StyledContentContainer>
  </StyledPageContainer>
);
