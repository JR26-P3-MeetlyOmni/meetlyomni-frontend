import type { ImageConfig } from '../../types';
import { ImageElement } from './shared';

const markConfig: ImageConfig = {
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
};

export const MarkIcon = () => <ImageElement config={markConfig} />;

export default MarkIcon;
