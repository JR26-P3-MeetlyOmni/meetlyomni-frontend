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
          gap: { xs: 1.5, sm: 2, md: 3 },
          px: { xs: 1, sm: 2, md: 4 },
          maxWidth: '1920px',
          mx: 'auto',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default FeatureCardGrid;
