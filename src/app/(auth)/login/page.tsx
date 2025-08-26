'use client';

import { useSignInForm } from '@/features/auth/hooks';

import React from 'react';

import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DecorativeElements } from './components/DecorativeElements';
import { SignInForm } from './components/SignInForm';

// Styled components
const StyledTitleBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
}));

const StyledWelcomeTitle = styled('h1')(({ theme }) => ({
  display: 'inline-block',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.h4,
  fontWeight: theme.typography.fontWeightBold,
  whiteSpace: 'nowrap',
  margin: 0,
}));

const StyledSubtitle = styled('h2')(({ theme }) => ({
  color: theme.palette.text.primary,
  ...theme.typography.h5,
  fontWeight: theme.typography.fontWeightBold,
  whiteSpace: 'nowrap',
  margin: 0,
}));

const StyledPageBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
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

function SignInTitle() {
  return (
    <StyledTitleBox>
      <StyledTitleContainer>
        <StyledWelcomeTitle>Welcome to Omni!</StyledWelcomeTitle>
        <StyledSubtitle>Let&apos;s Sign in Your Profile</StyledSubtitle>
      </StyledTitleContainer>
    </StyledTitleBox>
  );
}

export default function SigninPage() {
  const { formData, errors, handleInputChange, handleInputBlur } = useSignInForm();

  return (
    <StyledPageBox>
      <DecorativeElements />
      <StyledContainer maxWidth="sm">
        <SignInTitle />
        <SignInForm
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
        />
      </StyledContainer>
    </StyledPageBox>
  );
}
