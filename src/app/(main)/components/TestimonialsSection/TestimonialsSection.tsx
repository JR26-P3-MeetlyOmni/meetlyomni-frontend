'use client';

import { SAMPLE_TESTIMONIALS } from '@/constants/TestimonialSection';

import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import TestimonialCardGrid from './components/TestimonialCardGrid';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(7.5)} ${theme.spacing(4)}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(15.25)} 0 ${theme.spacing(20)}`,
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(65),
  margin: `0 ${theme.spacing(5)} ${theme.spacing(2)} 0`,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(65),
  margin: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(5)} ${theme.spacing(3)}`,
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body1.lineHeight,
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

export const TestimonialsSection: React.FC = () => {
  return (
    <StyledSection>
      <StyledTitle>{'What do our users say?'}</StyledTitle>
      <StyledSubtitle>
        {
          'Discover firsthand experiences shared by our valued customers. Hear their stories, and feedback that shed light on their journey with us.'
        }
      </StyledSubtitle>
      <TestimonialCardGrid data={SAMPLE_TESTIMONIALS} />
    </StyledSection>
  );
};

export default TestimonialsSection;
