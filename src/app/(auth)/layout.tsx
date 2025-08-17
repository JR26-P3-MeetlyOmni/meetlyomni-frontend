'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledAuthLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
