'use client';

import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  FormBackgroundIcon,
  GlassIcon,
  Logo,
  LookingForIcon,
  MarkIcon,
  RachelIcon,
  StarIcon,
} from './AuthPageDecorativeElements/AuthBackgroundIcons';
import { TopCenterSketch } from './AuthPageDecorativeElements/AuthBackgroundLayout';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const PageBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <PageContainer>
      <Logo />
      <TopCenterSketch />
      <RachelIcon />
      <MarkIcon />
      <GlassIcon />
      <LookingForIcon />
      <StarIcon />
      <FormBackgroundIcon />
      {children}
    </PageContainer>
  );
};
