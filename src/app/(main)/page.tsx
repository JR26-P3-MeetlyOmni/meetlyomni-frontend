'use client';

import CreateEventModal from '@/features/events/components/CreateEventModal';

import { useCallback, useState } from 'react';

import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import FaqAccordion from './components/FaqAccordion';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default function LocalPage() {
  const [creatEventModalOpen, setCreatEventModalOpen] = useState(true);
  const handleOnClose = useCallback(() => {
    setCreatEventModalOpen(false);
  }, []);

  return (
    <Box>
      <HeroSection />
      <CreateEventModal open={creatEventModalOpen} onClose={handleOnClose} />
      <FeatureCard />
      <ScenariosSection />
      <TestimonialsSection />
      <FaqAccordion />
    </Box>
  );
}
