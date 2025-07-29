<<<<<<< HEAD
import { routing } from '@/i18n/routing';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
=======
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))

export default async function LocaleLayout({
  children,
  params,
}: {
<<<<<<< HEAD
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
=======
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Add error handling for getMessages() call
  let messages;
  try {
    messages = await getMessages();
  } catch {
    // Provide fallback empty messages object to ensure layout continues to function
    // Error is silently handled to prevent layout crashes
    messages = {};
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div lang={locale}>{children}</div>
    </NextIntlClientProvider>
  );
>>>>>>> a17400f (re-structure to app router structure & config i18n (#17))
}
