'use client';

import Image from 'next/image';
import React from 'react';

import { Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const LogoElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  display: 'none',
  top: theme.spacing(2),
  left: theme.spacing(1),
  [theme.breakpoints.up('lg')]: { display: 'block', top: theme.spacing(4), left: theme.spacing(8) },
}));

const MagnifyingGlassElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    top: theme.spacing(10),
    left: theme.spacing(5),
  },
}));

const RachelElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    top: theme.spacing(10),
    right: theme.spacing(18),
  },
}));

const MarkElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    top: theme.spacing(55),
    left: theme.spacing(15),
  },
}));

const LookingForElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    top: theme.spacing(30),
    right: theme.spacing(10),
  },
}));

const FormElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

const StarElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    bottom: theme.spacing(10),
    right: theme.spacing(18),
  },
}));

const StyledImage = styled(Image)({ objectFit: 'contain' });
const MagnifyingGlassImage = styled(Image)(({ theme }) => ({
  opacity: 0.7,
  objectFit: 'contain',
  margin: `${theme.spacing(3)} ${theme.spacing(11)} ${theme.spacing(2)} ${theme.spacing(12)}`,
}));
const LookingForImage = styled(Image)({ opacity: 0.8, objectFit: 'contain' });
const FormImage = styled(Image)({ opacity: 0.8, objectFit: 'contain' });
const StarImage = styled(Image)({ opacity: 0.8, objectFit: 'contain' });

const DecorativeElementsContent = () => (
  <>
    <LogoElement>
      <StyledImage
        src="/assets/images/WelcomeToSignin/logo.png"
        alt="Omni Logo"
        width={105}
        height={30}
      />
    </LogoElement>

    <MagnifyingGlassElement>
      <MagnifyingGlassImage
        src="/assets/images/WelcomeToSignin/glass.png"
        alt="Magnifying glass"
        width={84}
        height={84}
      />
    </MagnifyingGlassElement>

    <RachelElement>
      <StyledImage
        src="/assets/images/WelcomeToSignin/rachel.png"
        alt="Rachel"
        width={209.3}
        height={97.2}
      />
    </RachelElement>

    <MarkElement>
      <StyledImage
        src="/assets/images/WelcomeToSignin/mark.png"
        alt="Mark"
        width={209.3}
        height={97.2}
      />
    </MarkElement>

    <LookingForElement>
      <LookingForImage
        src="/assets/images/WelcomeToSignin/lookingFor.png"
        alt="Looking For"
        width={179}
        height={42}
      />
    </LookingForElement>

    <FormElement>
      <FormImage
        src="/assets/images/WelcomeToSignin/form.png"
        alt="Form"
        width={460}
        height={337}
      />
    </FormElement>

    <StarElement>
      <StarImage src="/assets/images/WelcomeToSignin/star.png" alt="Star" width={72} height={72} />
    </StarElement>
  </>
);

export const DecorativeElements = () => {
  const theme = useTheme();
  const showDecor = useMediaQuery(theme.breakpoints.up('lg'));
  return showDecor ? <DecorativeElementsContent /> : null;
};
