import SentCenter from '@/app/(auth)/forgot-password/sent/components/SentCenter';
import { AuthResultPageComponent } from '@/components/ConfirmationForm';
import { TopLeftLogo } from '@/components/Logo';

import * as React from 'react';

export default function Page() {
  return (
    <main>
      <TopLeftLogo />
      <SentCenter>
        <AuthResultPageComponent
          iconSrc="/assets/images/confirmationForm/red-error-cross.svg"
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
