'use client';

import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React from 'react';

import { Box, styled } from '@mui/material';

// Styled components using proper MUI syntax with responsive positioning
const LogoElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  display: 'none',
  top: theme.spacing(2),
  left: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    top: theme.spacing(4),
    left: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(6),
    left: theme.spacing(6),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(4),
    left: theme.spacing(8),
  },
  [theme.breakpoints.up('xl')]: {
    top: theme.spacing(5),
    left: theme.spacing(10),
  },
}));

const MagnifyingGlassElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  top: theme.spacing(4),
  left: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    top: theme.spacing(10),
    left: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(12),
    left: theme.spacing(6),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(25),
    left: theme.spacing(15),
  },
  [theme.breakpoints.up('xl')]: {
    top: theme.spacing(38),
    left: theme.spacing(22),
  },
}));

const RachelElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  display: 'none',
  top: theme.spacing(8),
  right: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    top: theme.spacing(14),
    right: theme.spacing(10),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(16),
    right: theme.spacing(12),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(10),
    right: theme.spacing(18),
  },
  [theme.breakpoints.up('xl')]: {
    top: theme.spacing(15),
    right: theme.spacing(25),
  },
}));

const MarkElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  display: 'none',
  top: theme.spacing(25),
  left: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    top: theme.spacing(40),
    left: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(45),
    left: theme.spacing(8),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(55),
    left: theme.spacing(15),
  },
  [theme.breakpoints.up('xl')]: {
    top: theme.spacing(75),
    left: theme.spacing(22),
  },
}));

const LookingForElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  top: theme.spacing(15),
  right: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    top: theme.spacing(30),
    right: theme.spacing(12),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(35),
    right: theme.spacing(15),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(30),
    right: theme.spacing(10),
  },
  [theme.breakpoints.up('xl')]: {
    top: theme.spacing(45),
    right: theme.spacing(15),
  },
}));

const FormElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(4),
  left: '50%',
  zIndex: 1,
  display: 'none',
  transform: 'translateX(-50%)',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const StarElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  bottom: theme.spacing(2),
  right: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    bottom: theme.spacing(4),
    right: theme.spacing(8),
  },
  [theme.breakpoints.up('lg')]: {
    bottom: theme.spacing(10),
    right: theme.spacing(18),
  },
  [theme.breakpoints.up('xl')]: {
    bottom: theme.spacing(15),
    right: theme.spacing(25),
  },
}));

// Styled image components
const StyledImage = styled(Image)({
  objectFit: 'contain',
});

const MagnifyingGlassImage = styled(Image)(({ theme }) => ({
  opacity: 0.7,
  objectFit: 'contain',
  margin: `${theme.spacing(3)} ${theme.spacing(11)} ${theme.spacing(2)} ${theme.spacing(12)}`,
}));

const LookingForImage = styled(Image)({
  opacity: 0.8,
  objectFit: 'contain',
});

const FormImage = styled(Image)({
  opacity: 0.8,
  objectFit: 'contain',
});

const StarImage = styled(Image)({
  opacity: 0.8,
  objectFit: 'contain',
});

// Helper component to render decorative elements
const DecorativeElementsContent = () => (
  <>
    <LogoElement>
      <StyledImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/logo.png')}
        alt="Omni Logo"
        width={105}
        height={30}
      />
    </LogoElement>

    <MagnifyingGlassElement>
      <MagnifyingGlassImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/glass.png')}
        alt="Magnifying glass"
        width={84}
        height={84}
      />
    </MagnifyingGlassElement>

    <RachelElement>
      <StyledImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/rachel.png')}
        alt="Rachel"
        width={209.3}
        height={97.2}
      />
    </RachelElement>

    <MarkElement>
      <StyledImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/mark.png')}
        alt="Mark"
        width={209.3}
        height={97.2}
      />
    </MarkElement>

    <LookingForElement>
      <LookingForImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/lookingFor.png')}
        alt="Looking For"
        width={179}
        height={42}
      />
    </LookingForElement>

    <FormElement>
      <FormImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/form.png')}
        alt="Form"
        width={460}
        height={337}
      />
    </FormElement>

    <StarElement>
      <StarImage
        src={getAssetUrl('StaticFiles/assets/images/WelcomeToSignin/star.png')}
        alt="Star"
        width={72}
        height={72}
      />
    </StarElement>
  </>
);

export const DecorativeElements = () => <DecorativeElementsContent />;
