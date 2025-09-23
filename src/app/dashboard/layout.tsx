import { Header, Sidebar } from '@/components/Dashboard';

import React from 'react';

import { Box } from '@mui/material';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box display="flex" height="100vh" bgcolor="grey.50">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" bgcolor="grey.50">
        <Header />
        {children}
      </Box>
    </Box>
  );
}
