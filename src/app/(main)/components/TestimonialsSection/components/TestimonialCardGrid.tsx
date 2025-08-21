'use client';

import { CARD_POSITIONS } from '@/constants/TestimonialSection';
import { motion } from 'framer-motion';

import React, { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';

import { TestimonialCardGridProps } from '../types';
import TestimonialCard from './TestimonialCard';

const TestimonialCardGridWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2.5),
}));

const TestimonialCardGrid: React.FC<TestimonialCardGridProps> = ({ data = [] }) => {
  const [activeIdx, setActiveIdx] = useState(1);

  useEffect(() => {
    if (!data?.length) return;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.length]);

  const getCard = (offset: number) => {
    const idx = (activeIdx + offset + data.length) % data.length;
    return data[idx];
  };

  return (
    <TestimonialCardGridWrapper>
      {[-1, 0, 1].map((offset, i) => {
        const card = getCard(offset);
        const position = CARD_POSITIONS[i];

        const isCenter = position === 'center';
        if (!card || !position) return null;
        return (
          <motion.div
            key={card.id}
            initial={false}
            animate={{
              zIndex: isCenter ? 2 : 1,
              x: offset * 50,
            }}
            transition={{ duration: 0.7, type: 'spring' }}
            style={{ position: 'relative' }}
          >
            <TestimonialCard data={{ ...card, position }} data-testid={'testimonial-card'} />
          </motion.div>
        );
      })}
    </TestimonialCardGridWrapper>
  );
};

export default TestimonialCardGrid;
