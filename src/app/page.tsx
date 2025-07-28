import React from 'react';

import { Typography } from '@mui/material';

import FeatureCardGrid from '../components/CardGrid/FeatureCardGrid';
import { productFeatures, projectFeatures } from '../data/featuresData';

export default function Placeholder() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Coming Soon</h1>
      <p>This page is under construction.</p>

      <FeatureCardGrid data={projectFeatures} type="project" />

      <Typography
        sx={{
          width: '277px',
          height: '42px',
          margin: '80px auto 0 auto',
          fontFamily: 'Roboto',
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#14183b',
          textAlign: 'center',
        }}
      >
        Product Features
      </Typography>

      <FeatureCardGrid data={productFeatures} type="product" />
    </div>
  );
}
