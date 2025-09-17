// src/app/(auth)/reset-password/used/page.tsx
import * as React from 'react';
import { TopLeftLogo } from '@/components/Logo';
import { AuthResultPageComponent } from '@/components/ConfirmationForm';
import SentCenter from '@/app/(auth)/forgot-password/sent/components/SentCenter';

export default function Page() {
  return (
    <main>
      <TopLeftLogo />
      <SentCenter>
        <AuthResultPageComponent
          iconSrc="/assets/images/confirmationForm/red-error-cross.svg" // 红叉（public 下的 SVG）
          iconAlt="Already used"
          title="Link already used"
          description="This reset link has already been used or is no longer valid. Please request a new link."
          buttonText="Request a new link"
          buttonHref="/forgot-password"
        />
      </SentCenter>
    </main>
  );
}
