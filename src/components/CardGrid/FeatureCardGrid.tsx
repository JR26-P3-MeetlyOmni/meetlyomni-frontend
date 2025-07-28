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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
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
