import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

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
      <body className={roboto.variable}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}