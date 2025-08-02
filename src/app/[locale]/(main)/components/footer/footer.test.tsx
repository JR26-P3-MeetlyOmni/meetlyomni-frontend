import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from './footer';

// Mock messages for testing
const messages = {
  landing_page_footer: {
    privacyPolicy: 'Privacy Policy',
    termsForUsage: 'Terms for Usage',
    wechat: 'Wechat',
    contactUs: 'Contact Us',
    copyright: '© 2025 Meetly Omni. All rights reserved.',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

// Wrapper component for testing with i18n context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider messages={messages} locale="en">
    {children}
  </NextIntlClientProvider>
);

describe('Footer Component', () => {
  describe('Basic Rendering', () => {
    it('should render footer element', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display company logo', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const logo = screen.getByAltText('Omni Logo');
      expect(logo).toBeTruthy();
    });

    it('should display copyright text', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const copyright = screen.getByText('© 2025 Meetly Omni. All rights reserved.');
      expect(copyright).toBeTruthy();
    });
  });

  describe('Legal Links', () => {
    it('should have correct href attributes for legal links', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
      const termsLink = screen.getByRole('link', { name: 'Terms for Usage' });

      expect(privacyLink).toHaveAttribute('href', 'https://jiangren.com.au/privacy-policy');
      expect(termsLink).toHaveAttribute('href', 'https://jiangren.com.au/terms-and-conditions');
      expect(privacyLink).toHaveAttribute('target', '_blank');
      expect(termsLink).toHaveAttribute('target', '_blank');
      expect(privacyLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(termsLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should display separator between legal links', () => {
      render(<Footer />, { wrapper: TestWrapper });
      expect(screen.getByText('｜')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should render LinkedIn link with correct attributes', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const linkedinLink = screen.getByLabelText('LinkedIn');

      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/school/jr-academy');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render Twitter link with correct attributes', () => {
      render(<Footer />, { wrapper: TestWrapper });
      const twitterLink = screen.getByLabelText('Twitter');

      expect(twitterLink).toHaveAttribute('href', 'https://x.com/jr_academy_au');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('QR Codes', () => {
    it('should display QR code labels', () => {
      render(<Footer />, { wrapper: TestWrapper });
      expect(screen.getByText('Wechat')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });
});
