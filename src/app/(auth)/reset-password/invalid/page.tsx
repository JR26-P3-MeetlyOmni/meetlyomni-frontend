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
          iconSrc={getAssetUrl('StaticFiles/assets/images/confirmationForm/red-error-cross.svg')}
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
