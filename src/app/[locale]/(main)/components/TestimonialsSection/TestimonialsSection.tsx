'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import TestimonialCard from './components/TestimonialCard';
import type { TestimonialsSectionProps } from './types';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(7.5)} ${theme.spacing(4)}`,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(15.25)} 0 ${theme.spacing(20)}`,
  },
}));

const StyledGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
  '& > *:nth-child(1)': {
    position: 'relative',
    maskImage: 'linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
    maskRepeat: 'no-repeat',
    maskSize: 'cover',
    color: theme.palette.text.secondary,
  },
  '& > *:nth-child(2)': {
    backgroundColor: '#2269f0',
    color: theme.palette.common.white,

    '& > div > div > p:nth-child(2)': {
      color: '#acc8fd',
    },
  },
  '& > *:nth-child(3)': {
    position: 'relative',
    maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
    maskRepeat: 'no-repeat',
    maskSize: 'cover',
    color: theme.palette.text.secondary,
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(65),
  height: theme.spacing(5),
  margin: `0 ${theme.spacing(5)} ${theme.spacing(2)} 0`,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(65),
  height: theme.spacing(5),
  margin: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)} ${theme.spacing(3)}`,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.spacing(1.6),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body1.lineHeight,
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const t = useTranslations('testimonials-section');
  return (
    <StyledSection>
      <StyledTitle>{t('title')}</StyledTitle>
      <StyledSubtitle>{t('subtitle')}</StyledSubtitle>
      <StyledGrid>
        {data?.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </StyledGrid>
    </StyledSection>
  );
};

export default TestimonialsSection;
