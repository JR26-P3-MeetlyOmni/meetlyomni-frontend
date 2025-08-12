'use client';

import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { FeatureCardGridProps } from '../types';
import ProductFeatureCard from './ProductFeatureCard';
import ProjectFeatureCard from './ProjectFeatureCard';

const FeatureCardGridWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  gap: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => (
  <FeatureCardGridWrapper>
    {data.map(item =>
      type === 'project' ? (
        <ProjectFeatureCard
          key={`project-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
        />
      ) : (
        <ProductFeatureCard
          key={`product-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
        />
      ),
    )}
  </FeatureCardGridWrapper>
);

export default FeatureCardGrid;
