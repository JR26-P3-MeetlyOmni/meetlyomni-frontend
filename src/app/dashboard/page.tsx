'use client';

import { PageTitle } from '@/components/Dashboard';
import CreateEventModal from '@/features/events/components/CreateEventModal';

import React from 'react';
import { useCallback, useState } from 'react';

import { Box } from '@mui/material';

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
