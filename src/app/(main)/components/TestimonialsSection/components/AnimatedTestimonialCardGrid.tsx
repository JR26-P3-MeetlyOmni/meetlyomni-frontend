import React, { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';

import { AnimatedTestimonialCardGridProps, AnimatedTestimonialData } from '../types';
import AnimatedTestimonialCard from './AnimatedTestimonialCard';

const AnimatedTestimonialCardGridWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
}));

const AnimatedTestimonialCardGrid: React.FC<AnimatedTestimonialCardGridProps> = ({ data }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!data?.length) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data]);

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
    <AnimatedTestimonialCardGridWrapper>
      {getVisibleCards().map(card => (
        <AnimatedTestimonialCard key={card.id} animatedTestimonial={card} />
      ))}
    </AnimatedTestimonialCardGridWrapper>
  );
};

export default AnimatedTestimonialCardGrid;
