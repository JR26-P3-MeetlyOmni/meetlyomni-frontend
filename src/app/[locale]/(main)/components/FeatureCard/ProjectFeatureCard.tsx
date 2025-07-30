'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: theme.spacing(48), //'377px'
        height: theme.spacing(50), //'404px'
        px: theme.spacing(1.5), //'12px'
        pt: theme.spacing(1.5),
        pb: theme.spacing(5),
        borderRadius: Number(theme.shape.borderRadius),
        boxSizing: 'border-box',
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.common.white}, rgba(239, 244, 254, 0.15) 50%, ${theme.palette.common.white})`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: theme.shadows[4],
          cursor: 'pointer',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: theme.spacing(44), //'353px'
          height: theme.spacing(29), //'232px'
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
          fontSize: theme.spacing(2.5), // 20px
          lineHeight: 'normal',
          color: theme.palette.text.primary,
          textAlign: 'center',
          mb: theme.spacing(2),
          px: theme.spacing(1),
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          height: theme.spacing(5), //'40px'
          fontSize: theme.spacing(2), //16px
          lineHeight: 1.25,
          color: theme.palette.text.secondary,
          textAlign: 'center',
          px: theme.spacing(2),
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProjectFeatureCard;
