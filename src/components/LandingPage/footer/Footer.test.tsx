/* eslint-disable max-lines-per-function */
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

describe('Footer Component', () => {
  describe('Basic Rendering', () => {
    it('should render footer element', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should display company logo', () => {
      render(<Footer />);
      const logo = screen.getByAltText('Omni Logo');
      expect(logo).toBeTruthy();
    });

    it('should display copyright text', () => {
      render(<Footer />);
      const copyright = screen.getByText('© 2025 Meetly Omni. All rights reserved.');
      expect(copyright).toBeTruthy();
    });
  });

  describe('Legal Links', () => {
    it('should have correct href attributes for legal links', () => {
      render(<Footer />);
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });
      const termsLink = screen.getByRole('link', { name: 'Terms for Usage' });

      expect(privacyLink).toHaveAttribute('href', '#');
      expect(termsLink).toHaveAttribute('href', '#');
    });

    it('should display separator between legal links', () => {
      render(<Footer />);
      expect(screen.getByText('｜')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('should render LinkedIn link with correct attributes', () => {
      render(<Footer />);
      const linkedinLink = screen.getByLabelText('LinkedIn');

      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should render Twitter link with correct attributes', () => {
      render(<Footer />);
      const twitterLink = screen.getByLabelText('Twitter');

      expect(twitterLink).toHaveAttribute('href', 'https://www.twitter.com');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('QR Codes', () => {
    it('should display QR code labels', () => {
      render(<Footer />);
      expect(screen.getByText('Wechat')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });
});
