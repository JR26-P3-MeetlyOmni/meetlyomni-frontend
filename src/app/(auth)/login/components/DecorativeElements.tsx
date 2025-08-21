import Image from 'next/image';
import React from 'react';

import { Box, useTheme } from '@mui/material';
import type { Theme } from '@mui/material/styles';

const LogoElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: {
        xs: theme.spacing(5),
        sm: theme.spacing(6),
        md: theme.spacing(8),
        lg: theme.spacing(5),
      },
      left: {
        xs: theme.spacing(3),
        sm: theme.spacing(5),
        md: theme.spacing(10),
        lg: theme.spacing(10),
      },
      zIndex: 10,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/logo.png"
      alt="Omni Logo"
      width={105}
      height={30}
      style={{ objectFit: 'contain' }}
    />
  </Box>
);

const MagnifyingGlassElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: {
        xs: theme.spacing(10),
        sm: theme.spacing(15),
        md: theme.spacing(20),
        lg: theme.spacing(38),
      },
      left: {
        xs: theme.spacing(5),
        sm: theme.spacing(8),
        md: theme.spacing(10),
        lg: theme.spacing(22),
      },
      zIndex: 1,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/glass.png"
      alt="Magnifying glass"
      width={84}
      height={84}
      style={{
        opacity: 0.7,
        objectFit: 'contain',
        margin: `${theme.spacing(3)} ${theme.spacing(11)} ${theme.spacing(2)} ${theme.spacing(12)}`,
      }}
    />
  </Box>
);

const RachelElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: {
        xs: theme.spacing(20),
        sm: theme.spacing(22),
        md: theme.spacing(24),
        lg: theme.spacing(15),
      },
      right: {
        xs: theme.spacing(15),
        sm: theme.spacing(18),
        md: theme.spacing(20),
        lg: theme.spacing(25),
      },
      zIndex: 2,
      display: { xs: 'none', lg: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/rachel.png"
      alt="Rachel"
      width={209.3}
      height={97.2}
    />
  </Box>
);

const MarkElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: {
        xs: theme.spacing(60),
        sm: theme.spacing(65),
        md: theme.spacing(70),
        lg: theme.spacing(75),
      },
      left: {
        xs: theme.spacing(5),
        sm: theme.spacing(8),
        md: theme.spacing(12),
        lg: theme.spacing(22),
      },
      zIndex: 2,
      display: { xs: 'none', lg: 'block' },
    }}
  >
    <Image src="/assets/images/WelcomeToSignin/mark.png" alt="Mark" width={209.3} height={97.2} />
  </Box>
);

const LookingForElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: {
        xs: theme.spacing(45),
        sm: theme.spacing(50),
        md: theme.spacing(55),
        lg: theme.spacing(45),
      },
      right: {
        xs: theme.spacing(15),
        sm: theme.spacing(20),
        md: theme.spacing(25),
        lg: theme.spacing(15),
      },
      zIndex: 1,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/lookingFor.png"
      alt="Looking For"
      width={179}
      height={42}
      style={{ opacity: 0.8, objectFit: 'contain' }}
    />
  </Box>
);

const FormElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      top: theme.spacing(9),
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/form.png"
      alt="Form"
      width={460}
      height={337}
      style={{ opacity: 0.8, objectFit: 'contain' }}
    />
  </Box>
);

const StarElement = ({ theme }: { theme: Theme }) => (
  <Box
    sx={{
      position: 'absolute',
      bottom: {
        xs: theme.spacing(10),
        sm: theme.spacing(8),
        md: theme.spacing(5),
        lg: theme.spacing(15),
      },
      right: {
        xs: theme.spacing(5),
        sm: theme.spacing(8),
        md: theme.spacing(12),
        lg: theme.spacing(25),
      },
      zIndex: 1,
      display: { xs: 'none', sm: 'block' },
    }}
  >
    <Image
      src="/assets/images/WelcomeToSignin/star.png"
      alt="Star"
      width={72}
      height={72}
      style={{ opacity: 0.8, objectFit: 'contain' }}
    />
  </Box>
);

export const DecorativeElements = () => {
  const theme = useTheme();
  return (
    <>
      <LogoElement theme={theme} />
      <MagnifyingGlassElement theme={theme} />
      <RachelElement theme={theme} />
      <MarkElement theme={theme} />
      <LookingForElement theme={theme} />
      <FormElement theme={theme} />
      <StarElement theme={theme} />
    </>
  );
};
