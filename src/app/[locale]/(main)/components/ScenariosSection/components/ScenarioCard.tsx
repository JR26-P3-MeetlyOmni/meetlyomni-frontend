'use client';

import Image from 'next/image';
import React from 'react';

import { Box, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { ScenarioCardProps } from '../interface';

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '785 / 441.6',
  [theme.breakpoints.down('md')]: {
    height: '220px',
    aspectRatio: 'auto',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, transparent 0%, transparent 50%, ${alpha(
      theme.palette.common.black,
      0.6,
    )} 100%)`,
    zIndex: 1,
  },
}));

const StyledImage = styled(Image)({
  objectFit: 'cover',
});

const StyledDescription = styled('li')(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.common.white,
  opacity: 0.9,
  marginBottom: theme.spacing(0.75),
  fontFamily: 'var(--font-roboto)',
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(1.25),
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  zIndex: 2,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const StyledCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.spacing(1.5),
  },
}));

const StyledTitle = styled('h3')(({ theme }) => ({
  margin: 0,
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  lineHeight: theme.typography.h6.lineHeight,
  fontFamily: 'var(--font-roboto)',
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => {
  return (
    <StyledCard className={className}>
      <StyledImageContainer>
        <StyledImage
          src={scenario.image}
          alt={scenario.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </StyledImageContainer>

      <StyledContent>
        <StyledTitle>{scenario.title}</StyledTitle>
        <StyledList>
          {scenario.descriptions.map(desc => (
            <StyledDescription key={desc}>{desc}</StyledDescription>
          ))}
        </StyledList>
      </StyledContent>
    </StyledCard>
  );
};

export default ScenarioCard;
