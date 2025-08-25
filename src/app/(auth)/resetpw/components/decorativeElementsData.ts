// Data-driven configuration for decorative elements
import type { ImageConfig } from '../types';

export const charactersConfig: ImageConfig[] = [
  {
    src: '/assets/images/WelcomeToSignin/rachel.png',
    alt: 'Rachel',
    width: 209.3,
    height: 97.2,
    position: {
      top: '15vh',
      right: '8vw',
    },
    styles: {
      zIndex: 2,
      imageWidth: 'min(209px, 18vw)',
    },
    testId: 'rachel-wrapper',
  },
  {
    src: '/assets/images/WelcomeToSignin/mark.png',
    alt: 'Mark',
    width: 209.3,
    height: 97.2,
    position: {
      bottom: '20vh',
      left: '8vw',
    },
    styles: {
      zIndex: 2,
      imageWidth: 'min(209px, 18vw)',
    },
    testId: 'mark-wrapper',
  },
];

export const smallElementsConfig: ImageConfig[] = [
  {
    src: '/assets/images/WelcomeToSignin/glass.png',
    alt: 'Magnifying glass',
    width: 84,
    height: 84,
    position: {
      top: '25vh',
      left: '8vw',
    },
    styles: {
      zIndex: 1,
      opacity: 0.7,
      imageWidth: 'min(84px, 6vw)',
      imageHeight: 'min(84px, 6vw)',
    },
    testId: 'glass-wrapper',
  },
  {
    src: '/assets/images/WelcomeToSignin/lookingFor.png',
    alt: 'Looking For',
    width: 179,
    height: 42,
    position: {
      top: '50vh',
      right: '12vw',
    },
    styles: {
      zIndex: 1,
      opacity: 0.8,
      imageWidth: 'min(179px, 15vw)',
    },
    testId: 'looking-for-wrapper',
  },
  {
    src: '/assets/images/WelcomeToSignin/star.png',
    alt: 'Star',
    width: 72,
    height: 72,
    position: {
      bottom: '8vh',
      right: '25vw',
    },
    styles: {
      zIndex: 1,
      opacity: 0.8,
      imageWidth: 'min(72px, 5vw)',
      imageHeight: 'min(72px, 5vw)',
    },
    testId: 'star-wrapper',
  },
];

export const formBackgroundConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/form.png',
  alt: 'Form',
  width: 460,
  height: 337,
  position: {
    top: '12vh',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  styles: {
    zIndex: 1,
    opacity: 0.8,
    imageWidth: 'min(460px, 35vw)',
  },
  testId: 'form-wrapper',
};

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
