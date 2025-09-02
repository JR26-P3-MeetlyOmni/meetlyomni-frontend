'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { PASSWORD_RESET_SENT } from '@/constants/AuthResultData';
import { AuthResultPageComponent } from '@/app/(auth)/forgetpassword/components/passwordReset/ResultPage';
import { confirmEmailApi } from '@/features/auth';

const EmailRequestSuccess: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = React.useState('Verifying email...');
  const [description, setDescription] = React.useState('Please wait while we verify your email.');
  const [buttonHref, setButtonHref] = React.useState('/login');
  const [buttonText, setButtonText] = React.useState('Back to Login');

  React.useEffect(() => {
    const userId = params.get('userId');
    const code = params.get('code');
    const returnUrl = params.get('returnUrl') || '/login';
    setButtonHref(returnUrl);

    if (!userId || !code) {
      setTitle('Invalid verification link');
      setDescription('Missing userId or code. Please request a new verification email.');
      setButtonText('Back');
      return;
    }

    (async () => {
      try {
        const res = await confirmEmailApi({ userId, code });
        setTitle('Email Verified');
        setDescription('Your email has been verified successfully. You can sign in now.');
        setButtonText('Go to Login');
        // Optionally auto-redirect after short delay
        // setTimeout(() => router.push(returnUrl), 1500);
      } catch (e) {
        setTitle('Verification failed');
        setDescription(e instanceof Error ? e.message : 'Unable to verify email.');
        setButtonText('Back');
      }
    })();
  }, [params, router]);

  return (
    <AuthResultPageComponent
      iconSrc={PASSWORD_RESET_SENT.iconSrc}
      iconAlt={PASSWORD_RESET_SENT.iconAlt}
      title={title}
      description={description}
      buttonHref={buttonHref}
      buttonText={buttonText}
    />
  );
};

export default EmailRequestSuccess;
