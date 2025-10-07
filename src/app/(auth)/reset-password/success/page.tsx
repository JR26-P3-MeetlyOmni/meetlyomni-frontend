import SentCenter from '@/app/(auth)/forgot-password/sent/components/SentCenter';
import { AuthResultPageComponent } from '@/components/ConfirmationForm';
import { TopLeftLogo } from '@/components/Logo';
import { getAssetUrl } from '@/utils/cdn';

import * as React from 'react';

export default function Page() {
  return (
    <main>
      <TopLeftLogo />
      <SentCenter>
        <AuthResultPageComponent
          iconSrc={getAssetUrl(
            'StaticFiles/assets/images/confirmationForm/green-success-check.png',
          )}
          iconAlt="Success"
          title="Password has been updated"
          description="Your password has been successfully updated. Please return to the Email Sent page to sign in."
          showButton={false}
        />
      </SentCenter>
    </main>
  );
}
