'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import CompanyNameStep from './components/CompanyNameStep/CompanyNameStep';

export default function SignupPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();

  const nextStep = useCallback(
    (_companyName: string) => {
      router.push(`/${locale}/signup/email`);
    },
    [router, locale],
  );

  return <CompanyNameStep onNext={nextStep} />;
}
