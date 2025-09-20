// src/app/(auth)/reset-password/page.tsx
import * as React from 'react';
import ResetPasswordForm from './components/ResetPasswordForm';
import { TopLeftLogo } from '@/components/Logo';
import { redirect } from 'next/navigation';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: Props) {
  const tokenParam = searchParams?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

  if (!token) {
    
    redirect('/reset-password/invalid');
  }

  return (
    <main>
      <TopLeftLogo />
      <ResetPasswordForm token={token!} />
    </main>
  );
}
