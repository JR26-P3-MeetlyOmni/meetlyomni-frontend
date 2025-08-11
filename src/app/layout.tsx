import { MUIProvider } from '@/components/ProvidersN/MUIProvider';
import { ReduxProvider } from '@/store/provider';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

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
    <html lang="en" className={roboto.variable}>
      <body>
        <MUIProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </MUIProvider>
      </body>
    </html>
  );
}
