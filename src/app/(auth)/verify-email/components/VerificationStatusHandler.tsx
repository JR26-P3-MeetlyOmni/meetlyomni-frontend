'use client';

import { AuthResultPageComponent } from '@/components/ConfirmationForm/ConfirmationForm';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getVerificationStatusConfig } from '../config/verificationConfig';
import type { VerificationStatus } from '../types';

export type VerificationStatusHandlerProps = {
  status: string | null;
};

export const VerificationStatusHandler: React.FC<VerificationStatusHandlerProps> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState<VerificationStatus>('verifying');
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    const urlEmail = searchParams.get('email');

    if (urlStatus) {
      setCurrentStatus(urlStatus as VerificationStatus);
    } else if (status) {
      setCurrentStatus(status as VerificationStatus);
    }

    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [searchParams, status]);

  const normalizedStatus: VerificationStatus = currentStatus;
  const config = getVerificationStatusConfig(email || undefined)[normalizedStatus];

  return (
    <AuthResultPageComponent
      iconSrc={config.iconSrc}
      iconAlt={config.iconAlt}
      title={config.title}
      description={config.description}
      buttonText={config.buttonText}
      buttonHref={config.buttonHref}
    />
  );
};
