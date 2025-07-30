'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Box, styled } from '@mui/material';

import { getScenarioData } from './data';
import { ScenariosSectionProps } from './interface';
import ScenarioCard from './ScenarioCard';

const StyledTitle = styled('h2')(({ theme }) => ({
  margin: `0 0 ${theme.spacing(5)} 0`,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  lineHeight: theme.typography.h3.lineHeight,
  color: theme.palette.text.primary,
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    margin: `0 auto ${theme.spacing(10)} auto`,
    fontSize: theme.typography.h3.fontSize,
  },
}));

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing(3.75),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const StyledSection = styled('section')(({ theme }) => ({
  padding: `${theme.spacing(7.5)} 0`,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(15.25)} 0 ${theme.spacing(20)}`,
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1600px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.up('sm')]: {
    padding: `0 ${theme.spacing(3)}`,
  },
}));

const ScenariosSectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <StyledTitle>{title}</StyledTitle>
);

const ScenariosSectionGrid: React.FC<{ scenarios: ScenariosSectionProps['scenarios'] }> = ({
  scenarios,
}) => (
  <StyledGrid>
    {scenarios?.map(scenario => (
      <ScenarioCard key={scenario.id} scenario={scenario} />
    ))}
  </StyledGrid>
);

const ScenariosSection: React.FC<ScenariosSectionProps> = ({ title, scenarios, className }) => {
  const t = useTranslations('LandingPage');
  const displayScenarios = scenarios || getScenarioData(t);
  const displayTitle = title || t('scenarios.title');

  return (
    <StyledSection className={className}>
      <StyledContainer>
        <ScenariosSectionTitle title={displayTitle} />
        <ScenariosSectionGrid scenarios={displayScenarios} />
      </StyledContainer>
    </StyledSection>
  );
};

export default ScenariosSection;
