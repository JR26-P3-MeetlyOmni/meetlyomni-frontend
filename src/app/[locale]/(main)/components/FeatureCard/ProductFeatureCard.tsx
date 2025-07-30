'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: theme.spacing(48),
        height: theme.spacing(32), //'255px'
        pl: theme.spacing(5),
        pt: theme.spacing(5),
        pb: theme.spacing(5),
        borderRadius: Number(theme.shape.borderRadius),
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: theme.shadows[4],
          cursor: 'pointer',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: theme.spacing(50),
          height: theme.spacing(50),
          mb: theme.spacing(5),
          position: 'relative',
        }}
      >
        <Image src={imageUrl} alt="feature image" layout="fill" objectFit="contain" />
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: theme.spacing(2.5), //'20px'
          lineHeight: 'normal',
          color: theme.palette.text.primary,
          textAlign: 'left',
          mb: theme.spacing(2),
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          height: theme.spacing(5),
          fontSize: theme.spacing(2),
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          textAlign: 'left',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProductFeatureCard;
