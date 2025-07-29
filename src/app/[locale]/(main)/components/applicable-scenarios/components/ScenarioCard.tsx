'use client';

import Image from 'next/image';
import React from 'react';

<<<<<<< HEAD
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
=======
import { Box } from '@mui/material';

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

const ScenarioCardTitle: React.FC<{ title: string }> = ({ title }) => (
  <Box
    component="h3"
    sx={{
      fontSize: '20px',
      fontWeight: 700,
      margin: 0,
      marginBottom: { xs: '16px', sm: '24px' },
      lineHeight: 1.3,
      color: '#fff',
    }}
  >
    {title}
  </Box>
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
);

const ScenarioCardDescription: React.FC<{ description: string; isLast: boolean }> = ({
  description,
  isLast,
}) => (
<<<<<<< HEAD
  <StyledDescription style={{ marginBottom: isLast ? 0 : undefined }}>
    {description}
  </StyledDescription>
=======
  <Box
    component="li"
    sx={{
      fontSize: { xs: '13px', sm: '16px' },
      lineHeight: 1.5,
      color: '#b0b5bc',
      opacity: 0.9,
      marginBottom: isLast ? 0 : { xs: '6px', sm: '10px' },
    }}
  >
    {description}
  </Box>
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
);

const ScenarioCardContent: React.FC<{ scenario: ScenarioCardProps['scenario'] }> = ({
  scenario,
}) => (
<<<<<<< HEAD
  <StyledContent>
    <ScenarioCardTitle title={scenario.title} />
    <StyledList>
=======
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
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
      {scenario.descriptions.map((desc, index) => (
        <ScenarioCardDescription
          key={index}
          description={desc}
          isLast={index === scenario.descriptions.length - 1}
        />
      ))}
<<<<<<< HEAD
    </StyledList>
  </StyledContent>
);

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => (
  <StyledCard className={className}>
    <ScenarioCardImage image={scenario.image} imageAlt={scenario.imageAlt} />
    <ScenarioCardContent scenario={scenario} />
  </StyledCard>
=======
    </Box>
  </Box>
);

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => (
  <Box
    className={className}
    sx={{
      position: 'relative',
      borderRadius: { xs: '8px', sm: '12px' },
      overflow: 'hidden',
      background: '#000',
      cursor: 'pointer',
    }}
  >
    <ScenarioCardImage image={scenario.image} imageAlt={scenario.imageAlt} />
    <ScenarioCardContent scenario={scenario} />
  </Box>
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
);

export default ScenarioCard;
