'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

type ProductFeatureCardProps = {
  imageUrl: StaticImageData;
  title: string;
  description: string;
};

const ProductFeatureCardWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(48),
  height: theme.spacing(32), //'255px'
  pl: theme.spacing(5),
  pt: theme.spacing(5),
  pb: theme.spacing(5),
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
  alignItems: 'flex-start',
}));

const ProductFeatureImageWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(5), //40px
  height: theme.spacing(5),
  mb: theme.spacing(5),
  position: 'relative',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  height: theme.spacing(5),
  fontSize: theme.spacing(2),
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
  textAlign: 'left',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.spacing(2.5), //'20px'
  lineHeight: 'normal',
  color: theme.palette.text.primary,
  textAlign: 'left',
  mb: theme.spacing(2),
}));

const ProductFeatureCard: React.FC<ProductFeatureCardProps> = ({
  imageUrl,
  title,
  description,
}) => (
  <ProductFeatureCardWrapper>
    <ProductFeatureImageWrapper>
      <Image src={imageUrl} alt={`${title} feature illustration`} width="40" height="40" />
    </ProductFeatureImageWrapper>

    <StyledTitle variant="h6">{title}</StyledTitle>

    <StyledDescription variant="body2">{description}</StyledDescription>
  </ProductFeatureCardWrapper>
);

export default ProductFeatureCard;
