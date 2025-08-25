import { ImageElement } from './shared';
import type { ImageConfig } from '../../types';

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
};

export const LookingForIcon = () => (
  <ImageElement config={lookingForConfig} />
);

export default LookingForIcon;


