import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import FaqAccordion from './components/FaqAccordion';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default async function localPage() {
  return (
    <Box>
      <HeroSection />

      <FeatureCard />
      <ScenariosSection />
      <TestimonialsSection />
      <FaqAccordion />
    </Box>
  );
}
