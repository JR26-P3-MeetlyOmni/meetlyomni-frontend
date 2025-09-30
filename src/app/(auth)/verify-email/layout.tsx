import { TopLeftLogo } from '@/components/Logo';
import { SigninButton } from '@/components/SigninButton';

import React from 'react';

export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopLeftLogo />
      <SigninButton />
      {children}
    </>
  );
}
