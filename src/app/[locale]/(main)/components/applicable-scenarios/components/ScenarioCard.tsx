'use client';

import Image from 'next/image';
import React from 'react';

import { Box, useTheme } from '@mui/material';

import { ScenarioCardProps } from './interface';

const ScenarioCardImage: React.FC<{ image: string; imageAlt: string }> = ({ image, imageAlt }) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      aspectRatio: '785 / 441.6',
      '@media (max-width: 768px)': {
        height: '220px',
        aspectRatio: 'auto',
      },
    }}
  >
    <Image
      src={image}
      alt={imageAlt}
      fill
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      priority
    />
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.6) 100%)',
        zIndex: 1,
      }}
    />
  </Box>
);

const ScenarioCardTitle: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <Box
      component="h3"
      sx={{
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        margin: 0,
        marginBottom: { xs: '16px', sm: '24px' },
        lineHeight: theme.typography.h3.lineHeight,
        color: theme.typography.h3.color,
      }}
    >
      {title}
    </Box>
  );
};

const ScenarioCardDescription: React.FC<{ description: string; isLast: boolean }> = ({
  description,
  isLast,
}) => {
  const theme = useTheme();

  return (
    <Box
      component="li"
      sx={{
        fontSize: { xs: theme.typography.body2.fontSize, sm: theme.typography.body1.fontSize },
        lineHeight: theme.typography.body1.lineHeight,
        color: theme.palette.text.secondary,
        opacity: 0.9,
        marginBottom: isLast ? 0 : { xs: '6px', sm: '10px' },
      }}
    >
      {description}
    </Box>
  );
};

const ScenarioCardContent: React.FC<{ scenario: ScenarioCardProps['scenario'] }> = ({
  scenario,
}) => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: { xs: '16px', sm: '24px' },
      color: 'white',
      zIndex: 2,
    }}
  >
    <ScenarioCardTitle title={scenario.title} />
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      {scenario.descriptions.map((desc, index) => (
        <ScenarioCardDescription
          key={index}
          description={desc}
          isLast={index === scenario.descriptions.length - 1}
        />
      ))}
    </Box>
  </Box>
);

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        borderRadius: { xs: '8px', sm: '12px' },
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
      }}
    >
      <ScenarioCardImage image={scenario.image} imageAlt={scenario.imageAlt} />
      <ScenarioCardContent scenario={scenario} />
    </Box>
  );
};

export default ScenarioCard;
