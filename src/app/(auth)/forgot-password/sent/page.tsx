// src/app/(auth)/forgot-password/sent/page.tsx
import * as React from 'react';

import { TopLeftLogo } from '@/components/Logo';
import { AuthResultPageComponent } from '@/components/ConfirmationForm';
import SentCenter from './components/SentCenter';

export default function Page() {
  // TopLeftLogo 独立放置，确保位于左上角；内容区单独居中
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
