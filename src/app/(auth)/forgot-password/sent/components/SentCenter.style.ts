// src/app/(auth)/forgot-password/sent/components/SentCenter.style.ts
import { styled } from '@mui/material/styles';

export const Root = styled('section')(({ theme: _theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const Center = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.md,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
