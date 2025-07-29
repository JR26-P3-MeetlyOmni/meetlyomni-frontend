import ClientLayout from '@/components/ClientLayout';
import { ReduxProvider } from '@/store/provider';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { Roboto } from 'next/font/google';


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Meetly Omni',
  description: 'Meetly Omni - Your smart meeting assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
        <ReduxProvider>
          <ClientLayout className={`${geistSans.variable} ${geistMono.variable}`}>
            {children}
          </ClientLayout>
        </ReduxProvider>
      <body className={roboto.variable}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
