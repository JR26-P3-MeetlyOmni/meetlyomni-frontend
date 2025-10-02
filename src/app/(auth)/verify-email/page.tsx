import React from 'react';

import { VerificationStatusHandler } from './components/VerificationStatusHandler';

interface VerifyEmailPageProps {
  searchParams: {
    status?: string;
    email?: string;
  };
}

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const status = searchParams.status || null;

  return <VerificationStatusHandler status={status} />;
}
