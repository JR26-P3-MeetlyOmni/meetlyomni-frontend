import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import NewPasswordSuccess from '../components/NewPasswordSuccess';

// Mock the Auth components
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  FormContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-container">{children}</div>
  ),
}));

describe('NewPasswordSuccess', () => {
  it('renders success message correctly', () => {
    render(<NewPasswordSuccess />);

    expect(
      screen.getByText('Password has been reset successfully! Redirecting to login...'),
    ).toBeInTheDocument();
  });

  it('renders success alert', () => {
    render(<NewPasswordSuccess />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(
      'Password has been reset successfully! Redirecting to login...',
    );
  });

  it('renders without crashing', () => {
    expect(() => render(<NewPasswordSuccess />)).not.toThrow();
  });

  it('has correct structure', () => {
    render(<NewPasswordSuccess />);

    expect(screen.getByTestId('form-container')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
