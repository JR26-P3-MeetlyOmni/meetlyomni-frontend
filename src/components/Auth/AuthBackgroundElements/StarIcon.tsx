import { ImageElement } from './shared';
import type { ImageConfig } from '../types';

const starConfig: ImageConfig = {
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
};

export const StarIcon = () => (
  <ImageElement config={starConfig} />
);

export default StarIcon;


