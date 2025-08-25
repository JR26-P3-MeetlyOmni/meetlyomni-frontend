import type { ImageConfig } from '../../types';
import { ImageElement } from './shared';

const formBackgroundConfig: ImageConfig = {
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

export const FormBackgroundIcon = () => <ImageElement config={formBackgroundConfig} />;

export default FormBackgroundIcon;
