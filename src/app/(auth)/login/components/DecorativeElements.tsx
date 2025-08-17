import Image from 'next/image';
import React from 'react';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

import type { DecorativeContainerProps, ImageConfig, ResponsiveImageWrapperProps } from '../types';
import {
  charactersConfig,
  DECORATIVE_DIMENSIONS,
  DECORATIVE_SPACING,
  formBackgroundConfig,
  smallElementsConfig,
} from './decorativeElementsData';

const AbsoluteBox = styled(Box)({
  position: 'absolute',
});

const DecorativeContainer = styled(AbsoluteBox)<DecorativeContainerProps>(
  ({ theme, zIndex = theme.zIndex.mobileStepper, opacity = 1 }) => ({
    zIndex,
    opacity,
    display: 'block',
  }),
);

const LogoWrapper = styled(DecorativeContainer)(({ theme }) => ({
  top: theme.spacing(DECORATIVE_SPACING.LOGO_BASE),
  left: theme.spacing(DECORATIVE_SPACING.LOGO_BASE),
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create(['top', 'left'], {
    duration: theme.transitions.duration.standard,
  }),
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(DECORATIVE_SPACING.LOGO_SM),
    left: theme.spacing(DECORATIVE_SPACING.LOGO_SM),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(DECORATIVE_SPACING.LOGO_MD),
    left: theme.spacing(DECORATIVE_SPACING.LOGO_MD),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(DECORATIVE_SPACING.LOGO_LG_TOP),
    left: theme.spacing(DECORATIVE_SPACING.LOGO_LG_LEFT),
  },
}));

const TopCenterSketch = styled(DecorativeContainer)(({ theme }) => ({
  top: theme.spacing(DECORATIVE_SPACING.SKETCH_TOP),
  left: '50%',
  transform: 'translateX(-50%)',
  width: `min(${DECORATIVE_DIMENSIONS.SKETCH_WIDTH_BASE}px, 25vw)`,
  height: `min(${DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_BASE}px, 15vh)`,
  backgroundColor: alpha(theme.palette.grey[300], theme.palette.action.hoverOpacity),
  borderRadius: `${Number(theme.shape.borderRadius) * DECORATIVE_DIMENSIONS.BORDER_RADIUS_MULTIPLIER}px`,
  opacity: theme.palette.action.disabledOpacity,
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  [theme.breakpoints.up('md')]: {
    width: `min(${DECORATIVE_DIMENSIONS.SKETCH_WIDTH_MD}px, 28vw)`,
    height: `min(${DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_MD}px, 17vh)`,
  },
}));

const ResponsiveImageWrapper = styled(DecorativeContainer)<ResponsiveImageWrapperProps>(
  ({ theme, top, bottom, left, right, imageWidth, imageHeight = 'auto', transform }) => ({
    ...(top && { top }),
    ...(bottom && { bottom }),
    ...(left && { left }),
    ...(right && { right }),
    ...(transform && { transform }),
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.enteringScreen,
    }),
    '& img': {
      width: imageWidth,
      height: imageHeight,
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        transform: 'scale(1.02)',
      },
    },
  }),
);

const ImageElement: React.FC<{ config: ImageConfig }> = ({ config }) => (
  <ResponsiveImageWrapper {...config.position} {...config.styles} data-testid={config.testId}>
    <Image src={config.src} alt={config.alt} width={config.width} height={config.height} />
  </ResponsiveImageWrapper>
);

const LogoAndSketch = () => (
  <>
    <LogoWrapper zIndex={10} data-testid="logo-wrapper">
      <Image src="/assets/images/LogIn/logo.png" alt="Omni Logo" width={105} height={30} />
    </LogoWrapper>
    <TopCenterSketch zIndex={1} data-testid="top-center-sketch" />
  </>
);

const CharacterElements = () => (
  <>
    {charactersConfig.map(config => (
      <ImageElement key={config.testId} config={config} />
    ))}
  </>
);

const SmallElements = () => (
  <>
    {smallElementsConfig.map(config => (
      <ImageElement key={config.testId} config={config} />
    ))}
  </>
);

const FormBackground = () => <ImageElement config={formBackgroundConfig} />;

export const DecorativeElements = () => (
  <>
    <LogoAndSketch />
    <CharacterElements />
    <SmallElements />
    <FormBackground />
  </>
);
