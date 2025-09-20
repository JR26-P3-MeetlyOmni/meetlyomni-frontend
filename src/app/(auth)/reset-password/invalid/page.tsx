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
          iconAlt="Invalid"
          title="Invalid reset link"
          description="The reset link is invalid or has been tampered with. Please request a new link and try again."
          buttonText="Request a new link"
          buttonHref="/forgot-password"
        />
      </SentCenter>
    </main>
  );
}
