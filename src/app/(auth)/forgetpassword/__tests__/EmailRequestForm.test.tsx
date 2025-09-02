import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import EmailRequestForm from '../components/EmailRequestForm';

// Mock the auth hook
vi.mock('@/features/auth', () => ({
  useEmailRequestForm: () => ({
    email: '',
    emailSent: false,
    isSubmitting: false,
    displayError: '',
    handleEmailChange: vi.fn(),
    handleSubmit: vi.fn(e => e.preventDefault()),
  }),
}));

// Mock the Auth components
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  FormContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-container">{children}</div>
  ),
  FormTitle: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="form-title">{children}</h1>
  ),
  StyledSectionLabel: ({ children }: { children: React.ReactNode }) => (
    <label data-testid="section-label">{children}</label>
  ),
  StyledSubmitButton: ({ children, ...props }: any) => (
    <button data-testid="submit-button" {...props}>
      {children}
    </button>
  ),
  StyledTextField: ({ ...props }: any) => <input data-testid="email-input" {...props} />,
}));

// Mock the success component
vi.mock('../components/EmailRequestSuccess', () => ({
  default: () => <div data-testid="email-request-success">EmailRequestSuccess</div>,
}));

describe('EmailRequestForm', () => {
  it('renders the form with correct title', () => {
    render(<EmailRequestForm />);

    expect(screen.getByTestId('form-title')).toHaveTextContent('Reset your password');
    expect(screen.getByTestId('section-label')).toHaveTextContent('Email');
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Submit');
  });

  it('renders without crashing', () => {
    expect(() => render(<EmailRequestForm />)).not.toThrow();
  });

  it('has correct form structure', () => {
    render(<EmailRequestForm />);

    expect(screen.getByTestId('form-container')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
