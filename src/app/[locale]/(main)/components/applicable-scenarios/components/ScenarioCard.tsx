'use client';

import Image from 'next/image';
import React from 'react';

import { Box, styled, useTheme } from '@mui/material';

import { ScenarioCardProps } from './interface';

const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '785 / 441.6',
  [theme.breakpoints.down('md')]: {
    height: '220px',
    aspectRatio: 'auto',
  },
}));

const StyledOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 100%)',
  zIndex: 1,
});

const StyledTitle = styled('h3')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  margin: 0,
  marginBottom: theme.spacing(2),
  lineHeight: theme.typography.h6.lineHeight,
  color: theme.palette.common.white,
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
  },
}));

const StyledDescription = styled('li')(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.common.white,
  opacity: 0.9,
  marginBottom: theme.spacing(0.75),
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
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.spacing(1.5),
  },
}));

const ScenarioCardImage: React.FC<{ image: string; imageAlt: string }> = ({ image, imageAlt }) => {
  const theme = useTheme();

  return (
    <StyledImageContainer>
      <Image
        src={image}
        alt={imageAlt}
        fill
        style={{ objectFit: 'cover' }}
        sizes={`(max-width: ${theme.breakpoints.values.sm}px) 100vw, (max-width: ${theme.breakpoints.values.lg}px) 50vw, 25vw`}
        priority
      />
      <StyledOverlay />
    </StyledImageContainer>
  );
};

const ScenarioCardTitle: React.FC<{ title: string }> = ({ title }) => (
  <StyledTitle>{title}</StyledTitle>
);

const ScenarioCardDescription: React.FC<{ description: string; isLast: boolean }> = ({
  description,
  isLast,
}) => (
  <StyledDescription style={{ marginBottom: isLast ? 0 : undefined }}>
    {description}
  </StyledDescription>
);

const ScenarioCardContent: React.FC<{ scenario: ScenarioCardProps['scenario'] }> = ({
  scenario,
}) => (
  <StyledContent>
    <ScenarioCardTitle title={scenario.title} />
    <StyledList>
      {scenario.descriptions.map((desc, index) => (
        <ScenarioCardDescription
          key={index}
          description={desc}
          isLast={index === scenario.descriptions.length - 1}
        />
      ))}
    </StyledList>
  </StyledContent>
);

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => (
  <StyledCard className={className}>
    <ScenarioCardImage image={scenario.image} imageAlt={scenario.imageAlt} />
    <ScenarioCardContent scenario={scenario} />
  </StyledCard>
);

export default ScenarioCard;
