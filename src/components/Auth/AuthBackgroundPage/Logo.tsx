import Image from 'next/image';
import React from 'react';

import { LogoWrapper } from './shared';

export const Logo = () => (
  <LogoWrapper zIndex={10}>
    <Image src="/assets/images/WelcomeToSignin/logo.png" alt="Omni Logo" width={105} height={30} />
  </LogoWrapper>
);

export default Logo;
