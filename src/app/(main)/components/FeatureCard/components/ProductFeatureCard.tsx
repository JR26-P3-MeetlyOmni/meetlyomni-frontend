'use client';

import Image from 'next/image';
import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { FeatureCardItem } from '../types';

const ProductFeatureCardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: theme.spacing(32),
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius),
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
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
}));

const ProductFeatureImageWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  marginBottom: theme.spacing(5),
  position: 'relative',
  flexShrink: 0,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.h6.fontSize,
  lineHeight: 'normal',
  color: theme.palette.text.primary,
  textAlign: 'left',
  marginBottom: theme.spacing(2),
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  height: theme.spacing(5),
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));

const ProductFeatureCard: React.FC<FeatureCardItem> = ({ imageUrl, title, description }) => (
  <ProductFeatureCardWrapper>
    <ProductFeatureImageWrapper>
      <Image src={imageUrl} alt={`${title} feature illustration`} width="40" height="40" />
    </ProductFeatureImageWrapper>

    <StyledTitle variant="h6">{title}</StyledTitle>

    <StyledDescription variant="body2">{description}</StyledDescription>
  </ProductFeatureCardWrapper>
);

export default ProductFeatureCard;
