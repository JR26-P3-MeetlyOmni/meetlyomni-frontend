'use client';

import Image from 'next/image';
import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { FeatureCardItem } from '../types';

const ProjectFeatureCardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: theme.spacing(50),
  padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(5)}`,
  borderRadius: Number(theme.shape.borderRadius),
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.divider}`,
  backgroundImage: `linear-gradient(to bottom, ${theme.palette.common.white}, rgba(239, 244, 254, 0.15) 50%, ${theme.palette.common.white})`,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProjectFeatureImageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: '353/232',
  marginBottom: theme.spacing(5),
  position: 'relative',
  overflow: 'hidden',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.h6.fontSize,
  lineHeight: 'normal',
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  height: theme.spacing(5),
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: 1.25,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  px: theme.spacing(2),
}));

const ProjectFeatureCard: React.FC<FeatureCardItem> = ({ imageUrl, title, description }) => (
  <ProjectFeatureCardWrapper>
    <ProjectFeatureImageWrapper>
      <Image
        src={imageUrl}
        alt={`${title} feature illustration`}
        fill
        style={{ objectFit: 'cover' }}
      />
    </ProjectFeatureImageWrapper>

    <StyledTitle variant="h6">{title}</StyledTitle>

    <StyledDescription variant="body2">{description}</StyledDescription>
  </ProjectFeatureCardWrapper>
);

export default ProjectFeatureCard;
