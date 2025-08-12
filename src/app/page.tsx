import React from 'react';

import { Box } from '@mui/material';

import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';

export default async function RootPage() {
  return (
    <Box>
      <FeatureCard />
      <ScenariosSection />
    </Box>
  );
}
