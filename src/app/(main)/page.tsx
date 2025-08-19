import { Box } from '@mui/material';

import FaqAccordion from './components/FaqAccordion';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default async function localPage() {
  return (
    <Box>
      <FeatureCard />
      <ScenariosSection />
      <TestimonialsSection />
      <FaqAccordion />
    </Box>
  );
}
