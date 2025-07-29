'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Box, useTheme } from '@mui/material';

import { getScenarioData } from './data';
import { ScenariosSectionProps } from './interface';
import ScenarioCard from './ScenarioCard';

const ScenariosSectionTitle: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <Box
      component="h2"
      sx={{
        margin: { xs: '0 0 40px 0', sm: '0 auto 80px auto' },
        fontFamily: theme.typography.fontFamily,
        fontSize: { xs: '28px', sm: theme.typography.h2.fontSize },
        fontWeight: theme.typography.h2.fontWeight,
        lineHeight: theme.typography.h2.lineHeight,
        color: theme.palette.text.primary,
        textAlign: 'center',
      }}
    >
      {title}
    </Box>
  );
};

const ScenariosSectionGrid: React.FC<{ scenarios: ScenariosSectionProps['scenarios'] }> = ({
  scenarios,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(auto-fit, minmax(280px, 1fr))',
        lg: 'repeat(2, 1fr)',
      },
      gap: { xs: '20px', sm: '30px' },
    }}
  >
    {scenarios?.map(scenario => (
      <ScenarioCard key={scenario.id} scenario={scenario} />
    ))}
  </Box>
);

const ScenariosSection: React.FC<ScenariosSectionProps> = ({ title, scenarios, className }) => {
  const t = useTranslations('LandingPage');
  const theme = useTheme();
  const displayScenarios = scenarios || getScenarioData(t);
  const displayTitle = title || t('scenarios.title');

  return (
    <Box
      component="section"
      className={className}
      sx={{
        padding: { xs: '60px 0', sm: '122px 0 160px' },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: { xs: '0 16px', sm: '0 24px' },
        }}
      >
        <ScenariosSectionTitle title={displayTitle} />
        <ScenariosSectionGrid scenarios={displayScenarios} />
      </Box>
    </Box>
  );
};

export default ScenariosSection;
