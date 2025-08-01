'use client';

import AuthLayout from '@/app/[locale]/(auth)/components/AuthLayout/AuthLayout';

import React from 'react';

import { styled } from '@mui/material/styles';

const PlaceholderContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
}));

export default function LoginPage() {
  return (
    <AuthLayout>
      <PlaceholderContainer>
        <h1>Login Page</h1>
        <p>This is a placeholder for your login form.</p>
      </PlaceholderContainer>
    </AuthLayout>
  );
}
