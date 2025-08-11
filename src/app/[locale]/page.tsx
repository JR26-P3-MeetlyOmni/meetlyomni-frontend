import { getTranslations } from 'next-intl/server';
import React from 'react';

import { Box } from '@mui/material';

import { FeatureCard } from './(main)/components/FeatureCard';
import { ScenariosSection } from './(main)/components/ScenariosSection';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const _tCommon = await getTranslations('common');

  return (
    <Box sx={{ textAlign: 'center', mt: 12 }}>
      <h1>{t('title')}</h1>
      <p>{t('underConstruction')}</p>
      <p>{t('currentLocale', { locale })}</p>

      <FeatureCard />
      <ScenariosSection />
    </Box>
  );
}
