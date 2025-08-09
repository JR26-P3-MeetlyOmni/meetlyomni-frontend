'use client';

import Image from 'next/image';
import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FeatureListProps } from './FeatureCard.types';

const ProjectFeatureCardWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(48), //'377px'
  height: theme.spacing(50), //'404px'
  padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(5)}`, //'12px'
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
  width: theme.spacing(44), //'353px'
  height: theme.spacing(29), //'232px'
  marginBottom: theme.spacing(5),
  position: 'relative',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.spacing(2.5), // 20px
  lineHeight: 'normal',
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  height: theme.spacing(5), //'40px'
  fontSize: theme.spacing(2), //16px
  lineHeight: 1.25,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  px: theme.spacing(2),
}));

const ProjectFeatureCard: React.FC<FeatureListProps> = ({ imageUrl, title, description }) => (
  <ProjectFeatureCardWrapper>
    <ProjectFeatureImageWrapper>
      <Image src={imageUrl} alt={`${title} feature illustration`} width="353" height="232" />
    </ProjectFeatureImageWrapper>

    <StyledTitle variant="h6">{title}</StyledTitle>

    <StyledDescription variant="body2">{description}</StyledDescription>
  </ProjectFeatureCardWrapper>
);

export default ProjectFeatureCard;
