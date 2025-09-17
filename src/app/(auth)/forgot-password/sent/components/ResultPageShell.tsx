// src/app/(auth)/forgot-password/sent/components/ResultPageShell.tsx
'use client';

import React from 'react';
import { styled } from '@mui/material/styles';

const Root = styled('main')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: theme.spacing(10),
}));

const Center = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export default function ResultPageShell({ children }: { children: React.ReactNode }) {
  return (
    <Root>
      <Center>{children}</Center>
    </Root>
  );
}
