import { ImageElement } from './shared';
import type { ImageConfig } from '../../types';

const rachelConfig: ImageConfig = {
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
};

export const RachelIcon = () => (
  <ImageElement config={rachelConfig} />
);

export default RachelIcon;


