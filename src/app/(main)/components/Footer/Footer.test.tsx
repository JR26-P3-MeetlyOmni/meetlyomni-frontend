import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer Component', () => {
  it('should render the footer with all essential elements', () => {
    render(<Footer />);

    // Check if the copyright text is rendered
    expect(screen.getByText('© 2025 Meetly Omni. All rights reserved.')).toBeInTheDocument();

    // Check if legal links are rendered
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms for Usage')).toBeInTheDocument();

    // Check if contact links are rendered
    expect(screen.getByText('Wechat')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    // Check if logo is rendered
    expect(screen.getByAltText('Omni Logo')).toBeInTheDocument();
  });

  it('should have correct structure with footer tag', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('should contain legal links with correct target and rel attributes', () => {
    render(<Footer />);

    const privacyLink = screen.getByText('Privacy Policy').closest('a');
    const termsLink = screen.getByText('Terms for Usage').closest('a');

    expect(privacyLink).toHaveAttribute('target', '_blank');
    expect(privacyLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(termsLink).toHaveAttribute('target', '_blank');
    expect(termsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
