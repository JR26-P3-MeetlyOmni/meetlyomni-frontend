import { Box } from '@mui/material';

import FaqAccordion from './components/FaqAccordion';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';

export default async function localPage() {
  return (
    <Box>
      <FeatureCard />
      <ScenariosSection />
      <FaqAccordion />
    </Box>
  );
}
