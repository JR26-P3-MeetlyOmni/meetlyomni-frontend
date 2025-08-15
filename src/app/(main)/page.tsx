import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import { FeatureCard } from './components/FeatureCard';
import { ScenariosSection } from './components/ScenariosSection';

export default async function localPage() {
  return (
    <Box>
      <HeroSection />

      <FeatureCard />
      <ScenariosSection />
    </Box>
  );
}
