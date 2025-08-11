'use client';

import { ProductFeaturesData, ProjectFeaturesData } from '@/constants/FeaturesData';

import React from 'react';

import { Box, styled } from '@mui/material';

import FeatureCardGrid from './components/FeatureCardGrid';

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

const StyledTitle = styled('h2')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  textAlign: 'center',
  margin: `${theme.spacing(8)} auto ${theme.spacing(6)}`,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.h5.lineHeight,
  letterSpacing: 0,
  [theme.breakpoints.up('sm')]: {
    margin: `${theme.spacing(12)} auto ${theme.spacing(8)}`,
    fontSize: theme.typography.h4.fontSize,
    lineHeight: theme.typography.h4.lineHeight,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const FeatureCard: React.FC = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <FeatureCardGrid data={ProjectFeaturesData} type="project" />
        <StyledTitle>Product Features</StyledTitle>
        <FeatureCardGrid data={ProductFeaturesData} type="product" />
      </StyledContainer>
    </StyledSection>
  );
};

export default FeatureCard;
