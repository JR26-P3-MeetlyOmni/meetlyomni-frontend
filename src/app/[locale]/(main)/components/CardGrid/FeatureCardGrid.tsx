'use client';

import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import ProductFeatureCard from '../FeatureCard/ProductFeatureCard';
import ProjectFeatureCard from '../FeatureCard/ProjectFeatureCard';
import type { FeatureCardGridProps } from './FeatureCardGrid.types';

const FeatureCardGridWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  //default = lg
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  gap: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(1.5), //12px
    paddingRight: theme.spacing(1.5),
    gap: theme.spacing(1),
  },

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => {
  return (
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
};

export default FeatureCardGrid;
