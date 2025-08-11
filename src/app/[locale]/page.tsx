import React from 'react';

import { Box } from '@mui/material';

import { FeatureCard } from './(main)/components/FeatureCard';
import { ScenariosSection } from './(main)/components/ScenariosSection';

export default async function LocalePage() {
  return (
    <Box>
      <FeatureCard />
      <ScenariosSection />
    </Box>
  );
}
