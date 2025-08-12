import React from 'react';

import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';

export default async function LocalePage() {
  return (
    <Box>
      <HeroSection />

      <FeatureCard />
      <ScenariosSection />
    </Box>
  );
}
