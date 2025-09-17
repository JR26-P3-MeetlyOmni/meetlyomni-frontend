// src/app/(auth)/reset-password/success/page.tsx
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
          iconSrc="/assets/images/confirmationForm/green-success-check.png"
          iconAlt="Success"
          title="Password has been updated"
          description="Your password has been successfully updated. Please return to the Email Sent page to sign in."
          showButton={false}
        />
      </SentCenter>
    </main>
  );
}
