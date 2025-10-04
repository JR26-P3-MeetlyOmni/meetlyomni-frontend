import { TopLeftLogo } from '@/components/Logo';

import * as React from 'react';
import { redirect } from 'next/navigation';

import ResetPasswordForm from './components/ResetPasswordForm';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: Props) {
  const tokenParam = searchParams?.token;
  const emailParam = searchParams?.email;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;

  if (!token || !email) {
    redirect('/reset-password/invalid');
  }

  return (
    <main>
      <TopLeftLogo />
      <ResetPasswordForm token={token!} email={email!} />
    </main>
  );
}
