// src/app/signup/contact/page.tsx
'use client';

import { ContactInfoStep } from '@/features/auth/components/ContactInfoStep';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

// src/app/signup/contact/page.tsx

// src/app/signup/contact/page.tsx

export default function ContactPage() {
  const router = useRouter();

  const handleNext = useCallback(
    (_payload: { name: string; phone: string }) => {
      router.push('/signup/confirm');
    },
    [router],
  );

  const handleBack = useCallback(() => {
    router.push('/signup/password');
  }, [router]);

  return <ContactInfoStep onNext={handleNext} onBack={handleBack} />;
}
