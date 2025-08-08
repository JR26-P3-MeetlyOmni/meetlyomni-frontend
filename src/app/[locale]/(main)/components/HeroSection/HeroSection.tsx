'use client';

import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(10, 4),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(125),
  height: theme.spacing(34),
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.spacing(8.5),
  lineHeight: 1.29,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
  // 小屏幕
}));

const HeroDescription = styled(Typography)(({ theme }) => ({
  width: theme.spacing(104),
  height: theme.spacing(6),
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.spacing(2.5),
  lineHeight: 1.2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(10),
  // 小屏幕
}));

// 2 buttons
const HeroCTAWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3.75),
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(23),
  height: theme.spacing(7),
  padding: theme.spacing(3, 2.5),
  borderRadius: theme.spacing(2),
  letterSpacing: 0.5,
  marginBottom: theme.spacing(21),
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.8),
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: 2,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.08),
      transform: 'translateY(-2px)',
      borderWidth: 1,
    },
  },
}));

const HeroSection: React.FC = () => {
  return (
    <HeroSectionWrapper>
      <HeroTitle>Enhance Each Activity To Be More Intelligent, Enjoyable, And Productive</HeroTitle>
      <HeroDescription>
        Meetly Omni is an interactive platform for corporate events, launches, training sessions and
        community gatherings to make your audience more engaged, interactive and fun!
      </HeroDescription>

      <HeroCTAWrapper>
        <CTAButton variant="contained">Create Activity</CTAButton>
        <CTAButton variant="outlined">Join the Game</CTAButton>
      </HeroCTAWrapper>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
