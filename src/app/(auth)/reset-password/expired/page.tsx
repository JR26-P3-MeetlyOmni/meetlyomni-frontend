// src/app/(auth)/reset-password/expired/page.tsx
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
          iconSrc="/assets/images/confirmationForm/red-error-cross.svg"
          iconAlt="Expired"
          title="Reset link expired"
          description="This reset link has expired. Please request a new link to continue."
          buttonText="Request a new link"
          buttonHref="/forgot-password"
        />
      </SentCenter>
    </main>
  );
}
