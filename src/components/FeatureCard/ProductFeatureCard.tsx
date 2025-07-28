'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

type ProductFeatureCardProps = {
  imageUrl: StaticImageData;
  title: string;
  description: string;
};

const ProductFeatureCard: React.FC<ProductFeatureCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <Box
      sx={{
        width: '377px',
        height: '255px',
        margin: '80px 30px 40px 0',
        padding: '40px',
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ width: '40px', height: '40px', margin: '0 257px 56px 0' }}>
        <Image src={imageUrl} alt="feature image"></Image>
      </Box>
      <Typography
        sx={{
          width: '243px',
          height: '24px',
          margin: '56px 54px 15px 0',
          fontFamily: 'Roboto',
          fontSize: '20px',
          fontWeight: 500,
          color: '#14183b',
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          width: '297px',
          height: '40px',
          margin: '15px 0 0',
          fontFamily: 'Roboto',
          fontSize: '16px',
          lineHeight: 1.25,
          color: '#888e98',
          textAlign: 'left',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProductFeatureCard;
