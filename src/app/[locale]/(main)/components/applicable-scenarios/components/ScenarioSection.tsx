'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Box } from '@mui/material';

import { getScenarioData } from './data';
import { ScenariosSectionProps } from './interface';
import ScenarioCard from './ScenarioCard';

const ScenariosSectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Box
    component="h2"
    sx={{
      margin: { xs: '0 0 40px 0', sm: '0 auto 80px auto' },
      fontFamily: 'Roboto',
      fontSize: { xs: '28px', sm: '36px' },
      fontWeight: 'bold',
      lineHeight: 'normal',
      color: '#14183b',
      textAlign: 'center',
    }}
  >
    {title}
  </Box>
);

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
  const displayScenarios = scenarios || getScenarioData(t);
  const displayTitle = title || t('scenarios.title');

  return (
    <Box
      component="section"
      className={className}
      sx={{
        padding: { xs: '60px 0', sm: '122px 0 160px' },
        background: '#fff',
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
