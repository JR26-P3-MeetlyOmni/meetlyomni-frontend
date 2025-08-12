'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Box, styled, Typography } from '@mui/material';

import AnimatedTestimonialCard from './components/AnimatedTestimonialCard';
import type { AnimatedTestimonialData, TestimonialsSectionProps } from './types';

const StyledSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(7.5)} ${theme.spacing(4)}`,
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
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!data?.length) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data]);

  // Only show 3 cards: previous, current, next (circular)
  const getVisibleCards = () => {
    if (!data?.length) return [];
    const prevIdx = (activeIdx - 1 + data.length) % data.length;
    const nextIdx = (activeIdx + 1) % data.length;
    return [
      { ...data[prevIdx], position: 'left' } as AnimatedTestimonialData,
      { ...data[activeIdx], position: 'center' } as AnimatedTestimonialData,
      { ...data[nextIdx], position: 'right' } as AnimatedTestimonialData,
    ];
  };

  return (
    <StyledSection>
      <StyledTitle>{t('title')}</StyledTitle>
      <StyledSubtitle>{t('subtitle')}</StyledSubtitle>
      <StyledGrid>
        {getVisibleCards().map(card => {
          return <AnimatedTestimonialCard key={card.id} animatedTestimonial={card} />;
        })}
      </StyledGrid>
    </StyledSection>
  );
};

export default TestimonialsSection;
