'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

type ProjectFeatureCardProps = {
  imageUrl: StaticImageData;
  title: string;
  description: string;
};

const ProjectFeatureCard: React.FC<ProjectFeatureCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <Box
      sx={{
        width: '377px',
        height: '404px',
        padding: '12px 12px 60px',
        borderRadius: '16px',
        boxSizing: 'border-box',
        border: 'solid 1px #f0f1f4',
        backgroundImage: 'linear-gradient(to bottom, #fff, rgba(239, 244, 254, 0.15) 50%, #fff)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ width: ' 353px', height: '232px', margin: '0 0 40px' }}>
        <Image src={imageUrl} alt="feature image"></Image>
      </Box>
      <Typography
        sx={{
          width: '297px',
          height: '24px',
          margin: '40px 28px 16px',
          fontFamily: 'Roboto',
          fontSize: '20px',
          fontWeight: 500,
          textAlign: 'center',
          color: '#14183b',
          marginBottom: '16px',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '16px',
          lineHeight: 1.25,
          textAlign: 'center',
          color: '#888e98',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProjectFeatureCard;
