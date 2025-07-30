import { StaticImageData } from 'next/image';
import React from 'react';

import Box from '@mui/material/Box';

import ProductFeatureCard from '../FeatureCard/ProductFeatureCard';
import ProjectFeatureCard from '../FeatureCard/ProjectFeatureCard';

interface FeatureCardData {
  imageUrl: StaticImageData;
  title: string;
  desc: string;
}

export interface FeatureCardGridProps {
  data: FeatureCardData[];
  type: 'project' | 'product';
}

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({ data, type }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: '12px', sm: '16px', md: '24px' },
        px: { xs: 1, sm: 2, md: 4 },
        maxWidth: '1920px',
      }}
    >
      {data.map((item, index) =>
        type === 'project' ? (
          <ProjectFeatureCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.desc}
          />
        ) : (
          <ProductFeatureCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.desc}
          />
        ),
      )}
    </Box>
  );
};

export default FeatureCardGrid;
