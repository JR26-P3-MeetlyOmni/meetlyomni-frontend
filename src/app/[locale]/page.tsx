import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Box } from '@mui/material';

import { ProductFeaturesData, ProjectFeaturesData } from '../../constants/FeaturesData';
import FeatureCardGrid from '../[locale]/(main)/components/FeatureCard/CardGrid/FeatureCardGrid';
import ProductTitle from '../[locale]/(main)/components/FeatureCard/ProductTitle';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const _tCommon = await getTranslations('common');

  return (
    <Box sx={{ textAlign: 'center', mt: 12 }}>
      <h1>{t('title')}</h1>
      <p>{t('underConstruction')}</p>
      <p>{t('currentLocale', { locale })}</p>

      <FeatureCardGrid data={ProjectFeaturesData} type="project" />
      <ProductTitle />
      <FeatureCardGrid data={ProductFeaturesData} type="product" />
    </Box>
  );
}
