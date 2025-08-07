import { getTranslations } from 'next-intl/server';

import { Box } from '@mui/material';

import { ProductFeaturesData, ProjectFeaturesData } from '../../../constants/FeaturesData';
import FeatureCardGrid from './components/FeatureCard/CardGrid/FeatureCardGrid';
import ProductTitle from './components/FeatureCard/ProductTitle';
import { ScenariosSection } from './components/ScenariosSection';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <Box sx={{ textAlign: 'center', mt: 12 }}>
      <h1>{t('title')}</h1>
      <p>{t('underConstruction')}</p>
      <p>{t('currentLocale', { locale })}</p>

      <FeatureCardGrid data={ProjectFeaturesData} type="project" />
      <ProductTitle />
      <FeatureCardGrid data={ProductFeaturesData} type="product" />
      <ScenariosSection />
    </Box>
  );
}
