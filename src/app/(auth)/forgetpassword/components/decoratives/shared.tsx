import Image from 'next/image';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

import type { DecorativeContainerProps, ImageConfig, ResponsiveImageWrapperProps } from '../../types';
export const DECORATIVE_SPACING = {
  LOGO_BASE: 3,
  LOGO_SM: 4,
  LOGO_MD: 5,
  LOGO_LG_TOP: 3.5,
  LOGO_LG_LEFT: 6,
  SKETCH_TOP: 8,
} as const;

export const DECORATIVE_DIMENSIONS = {
  SKETCH_WIDTH_BASE: 300,
  SKETCH_HEIGHT_BASE: 180,
  SKETCH_WIDTH_MD: 350,
  SKETCH_HEIGHT_MD: 210,
  BORDER_RADIUS_MULTIPLIER: 2,
} as const;

const AbsoluteBox = styled(Box)({
  position: 'absolute',
});

export const DecorativeContainer = styled(AbsoluteBox, {
  shouldForwardProp: (prop) => !['zIndex', 'opacity'].includes(String(prop)),
})<DecorativeContainerProps>(({ theme, zIndex = theme.zIndex.mobileStepper, opacity = 1 }) => ({
  zIndex,
  opacity,
  display: 'block',
}));

export const LogoWrapper = styled(DecorativeContainer)(({ theme }) => ({
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

export const TopCenterSketch = styled(DecorativeContainer)(({ theme }) => ({
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

export const ResponsiveImageWrapper = styled(DecorativeContainer, {
  shouldForwardProp: (prop) => !['top', 'bottom', 'left', 'right', 'imageWidth', 'imageHeight', 'transform'].includes(String(prop)),
})<ResponsiveImageWrapperProps>(({ theme, top, bottom, left, right, imageWidth, imageHeight = 'auto', transform }) => ({
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
}));

export const ImageElement: React.FC<{ config: ImageConfig }> = ({ config }) => (
  <ResponsiveImageWrapper {...config.position} {...config.styles}>
    <Image src={config.src} alt={config.alt} width={config.width} height={config.height} />
  </ResponsiveImageWrapper>
);


