import { Box } from '@mui/material';

import HeroSection from '../(main)/components/HeroSection/HeroSection';
import { ProductFeaturesData, ProjectFeaturesData } from '../../../constants/FeaturesData';
import FeatureCardGrid from './components/FeatureCard/CardGrid/FeatureCardGrid';
import ProductTitle from './components/FeatureCard/ProductTitle';
import { ScenariosSection } from './components/ScenariosSection';

export default async function LocalePage() {
  return (
    <Box>
      <HeroSection />
      <FeatureCardGrid data={ProjectFeaturesData} type="project" />
      <ProductTitle />
      <FeatureCardGrid data={ProductFeaturesData} type="product" />
      <ScenariosSection />
    </Box>
  );
}
