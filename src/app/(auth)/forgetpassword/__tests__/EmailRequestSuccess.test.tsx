import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import EmailRequestSuccess from '../components/EmailRequestSuccess';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} data-testid="success-icon" />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => (
    <a href={href} data-testid="back-link">
      {children}
    </a>
  ),
}));

describe('EmailRequestSuccess', () => {
  it('renders success message correctly', () => {
    render(<EmailRequestSuccess />);

    expect(screen.getByText('Password reset link has been sent')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An email with password reset link has been sent to your email address. If you do not see it in the inbox, check your spam folder',
      ),
    ).toBeInTheDocument();
  });

  it('renders success icon', () => {
    render(<EmailRequestSuccess />);

    const icon = screen.getByTestId('success-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/assets/images/WelcomeToSignin/pwreset-icon.png');
    expect(icon).toHaveAttribute('alt', 'Success Checkmark');
  });

  it('renders back to sign in button', () => {
    render(<EmailRequestSuccess />);

    expect(screen.getByText('Back to Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('back-link')).toHaveAttribute('href', '/login');
  });

  it('renders without crashing', () => {
    expect(() => render(<EmailRequestSuccess />)).not.toThrow();
  });
});
