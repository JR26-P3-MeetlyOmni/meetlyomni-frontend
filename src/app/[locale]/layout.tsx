import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
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
}
