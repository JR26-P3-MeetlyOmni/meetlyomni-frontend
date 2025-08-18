'use client';

import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

import { DecorativeElements } from './components/DecorativeElements';
import { CompanyNameStep } from '@/features/auth/components/CompanyNameStep';

const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PageContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  marginTop: theme.spacing(12.5),
  [theme.breakpoints.up('sm')]: { marginTop: theme.spacing(18.75) },
  [theme.breakpoints.up('md')]: { marginTop: theme.spacing(25) },
  [theme.breakpoints.up('lg')]: { marginTop: theme.spacing(31.25) },
}));

export default function SignupPage() {
  const router = useRouter();

  const handleNext = useCallback(
    (_companyName: string) => {
      router.push('/signup/email');
    },
    [router],
  );

  return (
    <PageRoot>
      <DecorativeElements />
      <PageContainer maxWidth="sm">
        <CompanyNameStep onNext={handleNext} />
      </PageContainer>
    </PageRoot>
  );
}
