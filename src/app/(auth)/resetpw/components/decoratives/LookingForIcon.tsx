import type { ImageConfig } from '../../types';
import { ImageElement } from './shared';

const lookingForConfig: ImageConfig = {
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
};

export const LookingForIcon = () => <ImageElement config={lookingForConfig} />;

export default LookingForIcon;
