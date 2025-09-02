'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

import { SIGNUP_EMAIL_SUCCESS } from '@/constants/AuthResultData';
import { PASSWORD_RESET_SENT } from '@/constants/AuthResultData';
import { AuthResultPageComponent } from '@/app/(auth)/forgetpassword/components/passwordReset/ResultPage';

const EmailRequestSuccess: React.FC = () => {
  const params = useSearchParams();
  const email = params.get('email');

  const description = email
    ? `The system has sent a verification email to ${email}. You need to click the link in the email to complete the account activation.`
    : SIGNUP_EMAIL_SUCCESS.description;

  return (
    <AuthResultPageComponent
      iconSrc={PASSWORD_RESET_SENT.iconSrc}
      iconAlt={PASSWORD_RESET_SENT.iconAlt}
      title={SIGNUP_EMAIL_SUCCESS.title}
      description={description}
    />
  );
};

export default EmailRequestSuccess;
