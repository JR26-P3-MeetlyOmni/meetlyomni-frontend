'use client';

import { PageTitle } from '@/components/Dashboard';

import React from 'react';
import { useCallback, useState } from 'react';

import { Box } from '@mui/material';

import CreateEventModal from './events/components/CreateEventModal';

export default function DashboardPage() {
  const [creatEventModalOpen, setCreatEventModalOpen] = useState(true);
  const handleOnClose = useCallback(() => {
    setCreatEventModalOpen(false);
  }, []);

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
      <CreateEventModal open={creatEventModalOpen} onClose={handleOnClose} />
    </Box>
  );
}
