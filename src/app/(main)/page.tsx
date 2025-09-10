'use client';

import CreateEventModal from '@/features/events/components/CreateEventModal';

import { useCallback } from 'react';

import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import FaqAccordion from './components/FaqAccordion';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default function LocalPage() {
  const handleOnClose = useCallback(() => {}, []);

  const theme = {};
  return (
    <Box>
      <HeroSection />
      <CreateEventModal open={true} onClose={handleOnClose} theme={theme} />
      <FeatureCard />
      <ScenariosSection />
      <TestimonialsSection />
      <FaqAccordion />
    </Box>
  );
}
