// src/app/(auth)/forgot-password/components/RequestResetEmailForm.style.ts
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled('section')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.sm,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(8),
}));

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
}));

export const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
}));
