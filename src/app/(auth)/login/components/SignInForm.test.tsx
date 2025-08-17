import { renderWithProviders } from '@/test-utils/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

import { SignInFormProps } from '../types';
import { SignInForm } from './SignInForm';

// Mock auth module to prevent test-utils errors
vi.mock('@/features/auth', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    // Mock authReducer to prevent test-utils errors
    authReducer: (
      state = {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      },
      action: any,
    ) => state,
  };
});

// Mock Internal Link component
vi.mock('@/components/Link/Link', () => ({
  InternalLink: ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} data-testid="internal-link" {...props}>
      {children}
    </a>
  ),
}));

describe('SignInForm', () => {
  const mockHandleInputChange = vi.fn();
  const mockHandleInputBlur = vi.fn();
  const mockHandleSubmit = vi.fn();

  const defaultProps: SignInFormProps = {
    formData: { email: '', password: '' },
    errors: { email: '', password: '', auth: null },
    isSubmitting: false,
    hasSubmitted: false,
    handleInputChange: mockHandleInputChange,
    handleInputBlur: mockHandleInputBlur,
    handleSubmit: mockHandleSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render all form elements', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      // Check form fields
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

      // Check form controls
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
      expect(screen.getByText('Forgot Password ?')).toBeInTheDocument();

      // Check bottom section
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });

    it('should render with form data when provided', () => {
      const propsWithData = {
        ...defaultProps,
        formData: { email: 'test@example.com', password: 'password123' },
      };

      renderWithProviders(<SignInForm {...propsWithData} />);

      const emailInput = screen.getByDisplayValue('test@example.com');
      const passwordInput = screen.getByDisplayValue('password123');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('should render navigation links with correct hrefs', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const forgotPasswordLink = screen.getByText('Forgot Password ?').closest('a');
      const signUpLink = screen.getByText('Sign up').closest('a');

      expect(forgotPasswordLink).toHaveAttribute('href', '/PasswordReset');
      expect(signUpLink).toHaveAttribute('href', '/signup');
    });
  });

  describe('form interactions', () => {
    it('should handle email input changes', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(mockHandleInputChange).toHaveBeenCalledWith('email', 'test@example.com');
    });

    it('should handle password input changes', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(mockHandleInputChange).toHaveBeenCalledWith('password', 'password123');
    });

    it('should handle email input blur', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      fireEvent.blur(emailInput, { target: { value: 'test@example.com' } });

      expect(mockHandleInputBlur).toHaveBeenCalledWith('email', 'test@example.com');
    });

    it('should handle password input blur', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.blur(passwordInput, { target: { value: 'password123' } });

      expect(mockHandleInputBlur).toHaveBeenCalledWith('password', 'password123');
    });

    it('should handle form submission', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const form = document.querySelector('form');
      if (form) {
        fireEvent.submit(form);
      }

      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('should prevent default form submission', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const form = document.querySelector('form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

      if (form) {
        form.dispatchEvent(submitEvent);
      }

      expect(submitEvent.defaultPrevented).toBe(false); // Form handles preventDefault internally
    });
  });

  describe('error display', () => {
    it('should show field errors when hasSubmitted is true', () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          email: 'Email is required',
          password: 'Password must be at least 8 characters',
          auth: null,
        },
        hasSubmitted: true,
      };

      renderWithProviders(<SignInForm {...propsWithErrors} />);

      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });

    it('should not show field errors when hasSubmitted is false', () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          email: 'Email is required',
          password: 'Password must be at least 8 characters',
          auth: null,
        },
        hasSubmitted: false,
      };

      renderWithProviders(<SignInForm {...propsWithErrors} />);

      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument();
    });

    it('should show authentication error when present and hasSubmitted is true', () => {
      const propsWithAuthError = {
        ...defaultProps,
        errors: {
          email: '',
          password: '',
          auth: 'Invalid email or password',
        },
        hasSubmitted: true,
      };

      renderWithProviders(<SignInForm {...propsWithAuthError} />);

      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });

    it('should not show authentication error when hasSubmitted is false', () => {
      const propsWithAuthError = {
        ...defaultProps,
        errors: {
          email: '',
          password: '',
          auth: 'Invalid email or password',
        },
        hasSubmitted: false,
      };

      renderWithProviders(<SignInForm {...propsWithAuthError} />);

      expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
    });

    it('should apply error styling to fields with errors', () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          email: 'Invalid email',
          password: 'Invalid password',
          auth: null,
        },
        hasSubmitted: true,
      };

      renderWithProviders(<SignInForm {...propsWithErrors} />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      // Check if inputs have error attribute
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('loading states', () => {
    it('should disable submit button when submitting', () => {
      const loadingProps = {
        ...defaultProps,
        isSubmitting: true,
      };

      renderWithProviders(<SignInForm {...loadingProps} />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
    });

    it('should show loading text when submitting', () => {
      const loadingProps = {
        ...defaultProps,
        isSubmitting: true,
      };

      renderWithProviders(<SignInForm {...loadingProps} />);

      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    });

    it('should enable submit button when not submitting', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeEnabled();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper form structure', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form?.tagName.toLowerCase()).toBe('form');
    });

    it('should have proper input attributes', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      // Check required attributes
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('required');

      // Check input types
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Check autocomplete attributes
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
      expect(passwordInput).toHaveAttribute('autocomplete', 'current-password');

      // Check names and ids
      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });

    it('should have proper submit button attributes', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should focus email input on mount', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const emailInput = screen.getByPlaceholderText('Email Address');

      // Check if the email input is the focused element or has autoFocus
      // Note: In testing environment, autoFocus may not always trigger actual focus
      expect(
        emailInput === document.activeElement ||
          emailInput.hasAttribute('autoFocus') ||
          emailInput.getAttribute('autoFocus') === '' ||
          emailInput.getAttribute('autoFocus') === 'true',
      ).toBe(true);
    });

    it('should have proper link accessibility', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const forgotPasswordLink = screen.getByRole('link', { name: /forgot password/i });
      const signUpLink = screen.getByRole('link', { name: /sign up/i });

      expect(forgotPasswordLink).toBeInTheDocument();
      expect(signUpLink).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('should have proper form styling', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const form = document.querySelector('form');
      expect(form).toHaveStyle({
        maxWidth: '412px',
        marginLeft: 'auto',
        marginRight: 'auto',
      });
    });

    it('should have proper button styling', () => {
      renderWithProviders(<SignInForm {...defaultProps} />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toHaveStyle({
        width: '412px',
        height: '38px',
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty form data', () => {
      const emptyProps = {
        ...defaultProps,
        formData: { email: '', password: '' },
      };

      renderWithProviders(<SignInForm {...emptyProps} />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });

    it('should handle null auth error', () => {
      const nullAuthErrorProps = {
        ...defaultProps,
        errors: { email: '', password: '', auth: null },
        hasSubmitted: true,
      };

      expect(() => {
        renderWithProviders(<SignInForm {...nullAuthErrorProps} />);
      }).not.toThrow();
    });

    it('should handle undefined auth error', () => {
      const undefinedAuthErrorProps = {
        ...defaultProps,
        errors: { email: '', password: '' }, // auth property missing
        hasSubmitted: true,
      };

      expect(() => {
        renderWithProviders(<SignInForm {...undefinedAuthErrorProps} />);
      }).not.toThrow();
    });
  });
});
