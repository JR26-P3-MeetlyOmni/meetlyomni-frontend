'use client';

import { useAppSelector } from '@/store/hooks';
import { isAdmin } from '@/utils/permissions';

import React from 'react';

import { Alert, Box, Typography } from '@mui/material';

interface AdminOnlyWrapperProps {
  children: React.ReactNode;
}

export default function AdminOnlyWrapper({ children }: AdminOnlyWrapperProps) {
  const user = useAppSelector(state => state.auth.user);

  if (!isAdmin(user)) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1">
            You don&apos;t have permission to access this page. Only administrators can send
            invitations.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return <>{children}</>;
}
