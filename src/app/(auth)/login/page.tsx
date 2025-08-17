'use client';

import React from 'react';
import { AuthGuard, useSignInForm } from '@/features/auth';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { DecorativeElements } from './components/DecorativeElements';
import { SignInForm } from './components/SignInForm';

const CenteredContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  marginTop: theme.spacing(6),
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

const TitleWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  fontFamily: 'var(--font-roboto)',
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.up('md')]: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
}));

const TitleBadge = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  padding: `${theme.spacing(0.5)}`,
  borderRadius: theme.shape.borderRadius,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(34),
  lineHeight: 1,
  whiteSpace: 'nowrap',
}));

const TitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(34),
  lineHeight: 1,
  whiteSpace: 'nowrap',
}));

export default function LoginPage() {
  const {
    formData,
    errors,
    isSubmitting,
    hasSubmitted,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
  } = useSignInForm();

  return (
    <AuthGuard requireAuth={false}>
      <DecorativeElements />

      <CenteredContainer maxWidth="lg">
        <TitleWrapper>
          <TitleRow>
            <TitleBadge variant="h4">Welcome to Omni !</TitleBadge>
            <TitleText variant="h5">Let&apos;s Sign in Your Profile</TitleText>
          </TitleRow>
        </TitleWrapper>

        <SignInForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          hasSubmitted={hasSubmitted}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          handleSubmit={handleSubmit}
        />
      </CenteredContainer>
    </AuthGuard>
  );
}
