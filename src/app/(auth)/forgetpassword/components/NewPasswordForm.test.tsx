import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import NewPasswordForm from './NewPasswordForm';

// Mock the auth hook
vi.mock('@/features/auth', () => ({
  useNewPasswordForm: () => ({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    success: false,
    isSubmitting: false,
    resetError: '',
    validation: {
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    },
    isValidPassword: false,
    showValidation: false,
    setPassword: vi.fn(),
    setConfirmPassword: vi.fn(),
    toggleShowPassword: vi.fn(),
    toggleShowConfirmPassword: vi.fn(),
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
  StyledSubmitButton: ({ children, ...props }: any) => (
    <button data-testid="submit-button" {...props}>
      {children}
    </button>
  ),
}));

// Mock the child components
vi.mock('./NewPasswordSuccess', () => ({
  default: () => <div data-testid="new-password-success">NewPasswordSuccess</div>,
}));

vi.mock('./passwordReset/PasswordFormFields', () => ({
  default: () => <div data-testid="password-form-fields">PasswordFormFields</div>,
}));

describe('NewPasswordForm', () => {
  it('renders the form with correct title', () => {
    render(<NewPasswordForm token="test-token" />);

    expect(screen.getByTestId('form-title')).toHaveTextContent('Reset your password');
    expect(screen.getByTestId('password-form-fields')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Reset password');
  });

  it('renders without crashing', () => {
    expect(() => render(<NewPasswordForm token="test-token" />)).not.toThrow();
  });

  it('has correct form structure', () => {
    render(<NewPasswordForm token="test-token" />);

    expect(screen.getByTestId('form-container')).toBeInTheDocument();
    expect(screen.getByTestId('form-title')).toBeInTheDocument();
    expect(screen.getByTestId('password-form-fields')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
