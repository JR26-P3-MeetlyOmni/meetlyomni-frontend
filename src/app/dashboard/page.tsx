import { PageTitle } from '@/components/Dashboard';

import React from 'react';

import { Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box
      minHeight="calc(100vh - 80px)"
      bgcolor="background.default"
      padding={3}
      flex={1}
      display="flex"
      flexDirection="column"
    >
      <PageTitle
        title="Dashboard"
        subtitle="Welcome to your dashboard. This page is still under development."
      />
      {/* Empty dashboard content */}
    </Box>
  );
}
