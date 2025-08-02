'use client';

import theme from '@/theme';

import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, className }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={className}>{children}</div>
    </ThemeProvider>
  );
};

export default ClientLayout;
