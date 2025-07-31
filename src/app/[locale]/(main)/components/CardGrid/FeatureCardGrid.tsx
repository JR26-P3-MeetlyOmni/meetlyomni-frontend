import React from 'react';

import Box from '@mui/material/Box';

import ProductFeatureCard from '../FeatureCard/ProductFeatureCard';
import ProjectFeatureCard from '../FeatureCard/ProjectFeatureCard';
import type { FeatureCardGridProps } from './FeatureCardGrid.types';

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: '12px', sm: '16px', md: '24px' },
          px: { xs: 1, sm: 2, md: 4 },
          maxWidth: '1920px',
          mx: 'auto',
        }}
      >
        {data.map((item, index) =>
          type === 'project' ? (
            <ProjectFeatureCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
            />
          ) : (
            <ProductFeatureCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
            />
          ),
        )}
      </Box>
    </Box>
  );
};

export default FeatureCardGrid;
