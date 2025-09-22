// src/app/(auth)/forgot-password/sent/page.tsx
import { AuthResultPageComponent } from '@/components/ConfirmationForm';
import { TopLeftLogo } from '@/components/Logo';

import * as React from 'react';

import SentCenter from './components/SentCenter';

export default function Page() {
  return (
    <main>
      <TopLeftLogo />
      <SentCenter>
        <AuthResultPageComponent
          iconSrc="/assets/images/confirmationForm/green-success-check.png"
          iconAlt="Success"
          title="Password reset link has been sent"
          description="An email with password reset link has been sent to your email address. If you do not see it in the inbox, check your spam folder."
          buttonText="Back to Sign In"
          buttonHref="/login"
        />
      </SentCenter>
    </main>
  );
}
