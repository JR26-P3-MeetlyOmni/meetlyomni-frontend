import { AuthResultPageComponent } from '@/components/ConfirmationForm/ConfirmationForm';
import { getAssetUrl } from '@/utils/cdn';

import React from 'react';

interface EmailSentPageProps {
  searchParams: {
    email?: string;
  };
}

export default function EmailSentPage({ searchParams }: EmailSentPageProps) {
  const email = searchParams.email || 'your email';

  return (
    <AuthResultPageComponent
      iconSrc={getAssetUrl('StaticFiles/assets/images/confirmationForm/invalid-name.png')}
      iconAlt="Email sent successfully"
      title="Email sent successfully"
      description={`The system has sent a verification email to ${email}. You need to click the link in the email to complete the account activation.`}
    />
  );
}
