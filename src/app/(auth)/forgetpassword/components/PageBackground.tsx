'use client';

import {
  FormBackgroundIcon,
  GlassIcon,
  Logo,
  LookingForIcon,
  MarkIcon,
  RachelIcon,
  StarIcon,
  TopCenterSketch,
} from '@/components/Auth';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  display: 'flex',
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
