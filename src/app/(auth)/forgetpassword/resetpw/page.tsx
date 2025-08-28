'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';

import NewPasswordForm from '../components/NewPasswordForm';
import { PageBackground, AuthResultPageComponent } from '@/components/Auth';
import { INVALID_RESET_LINK } from '@/constants/AuthResultData';



function VerifyPageContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get('token');

    if (!tokenParam) {
      setError('Invalid reset link. Please request a new password reset.');
      setIsLoading(false);
      return;
    }

    setToken(tokenParam);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <PageBackground>
        <CircularProgress />
      </PageBackground>
    );
  }

  if (error || !token) {
    return (
      <PageBackground>
        <AuthResultPageComponent
          iconSrc={INVALID_RESET_LINK.iconSrc}
          iconAlt={INVALID_RESET_LINK.iconAlt}
          title={INVALID_RESET_LINK.title}
          description={INVALID_RESET_LINK.description}
        />
      </PageBackground>
    );
  }

  return <NewPasswordForm token={token} />;
}

export default function VerifyPage() {
  return (
      <PageBackground>
      <Suspense
        fallback={ <CircularProgress /> }
      >
        <VerifyPageContent />
      </Suspense>
      </PageBackground>
  );
}
