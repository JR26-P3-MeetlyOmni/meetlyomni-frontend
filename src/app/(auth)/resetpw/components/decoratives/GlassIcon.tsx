import type { ImageConfig } from '../../types';
import { ImageElement } from './shared';

const glassConfig: ImageConfig = {
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
};

export const GlassIcon = () => <ImageElement config={glassConfig} />;

export default GlassIcon;
