import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { renderWithProviders } from '@/test-utils/test-utils';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

// Mock AuthGuard component and auth exports
vi.mock('@/features/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    AuthGuard: ({ children, requireAuth }: { children: React.ReactNode; requireAuth: boolean }) => (
      <div data-testid="auth-guard" data-require-auth={requireAuth}>
        {children}
      </div>
    ),
    useSignInForm: vi.fn(),
    // Mock authReducer to prevent test-utils errors
    authReducer: (state = { user: null, token: null, isAuthenticated: false, isLoading: false, isInitialized: true, error: null }, action: any) => state,
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

import { useSignInForm } from '@/features/auth';
import LoginPage from './page';

describe('LoginPage', () => {
  const mockFormData = { email: '', password: '' };
  const mockErrors = { email: '', password: '', auth: null };
  const mockHandleInputChange = vi.fn();
  const mockHandleInputBlur = vi.fn();
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation for useSignInForm
    vi.mocked(useSignInForm).mockReturnValue({
      formData: mockFormData,
      errors: mockErrors,
      isSubmitting: false,
      hasSubmitted: false,
      handleInputChange: mockHandleInputChange,
      handleInputBlur: mockHandleInputBlur,
      handleSubmit: mockHandleSubmit,
    });
  });

  describe('rendering', () => {
    it('should render the login page with all components', () => {
      renderWithProviders(<LoginPage />);

      // Check AuthGuard is rendered with correct props
      expect(screen.getByTestId('auth-guard')).toBeInTheDocument();
      expect(screen.getByTestId('auth-guard')).toHaveAttribute('data-require-auth', 'false');

      // Check title elements
      expect(screen.getByText('Welcome to Omni !')).toBeInTheDocument();
      expect(screen.getByText("Let's Sign in Your Profile")).toBeInTheDocument();

      // Check form elements
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render decorative elements with images', () => {
      renderWithProviders(<LoginPage />);

      // Check for decorative images
      expect(screen.getByAltText('Omni Logo')).toBeInTheDocument();
      expect(screen.getByAltText('Magnifying glass')).toBeInTheDocument();
      expect(screen.getByAltText('Rachel')).toBeInTheDocument();
      expect(screen.getByAltText('Mark')).toBeInTheDocument();
      expect(screen.getByAltText('Looking For')).toBeInTheDocument();
      expect(screen.getByAltText('Form')).toBeInTheDocument();
      expect(screen.getByAltText('Star')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      renderWithProviders(<LoginPage />);

      // Check for Forgot Password link
      expect(screen.getByText('Forgot Password ?')).toBeInTheDocument();
      const forgotPasswordLink = screen.getByText('Forgot Password ?').closest('a');
      expect(forgotPasswordLink).toHaveAttribute('href', '/PasswordReset');

      // Check for Sign up link
      expect(screen.getByText('Sign up')).toBeInTheDocument();
      const signUpLink = screen.getByText('Sign up').closest('a');
      expect(signUpLink).toHaveAttribute('href', '/signup');

      // Check for descriptive text
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    });
  });

  describe('form interactions', () => {
    it('should handle email input changes', () => {
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      expect(mockHandleInputChange).toHaveBeenCalledWith('email', 'test@example.com');
    });

    it('should handle password input changes', () => {
      renderWithProviders(<LoginPage />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(mockHandleInputChange).toHaveBeenCalledWith('password', 'password123');
    });

    it('should handle email input blur', () => {
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      fireEvent.blur(emailInput, { target: { value: 'test@example.com' } });

      expect(mockHandleInputBlur).toHaveBeenCalledWith('email', 'test@example.com');
    });

    it('should handle password input blur', () => {
      renderWithProviders(<LoginPage />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.blur(passwordInput, { target: { value: 'password123' } });

      expect(mockHandleInputBlur).toHaveBeenCalledWith('password', 'password123');
    });

    it('should handle form submission', () => {
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  describe('error states', () => {
    it('should display field errors when hasSubmitted is true', () => {
      vi.mocked(useSignInForm).mockReturnValue({
        formData: mockFormData,
        errors: {
          email: 'Email is required',
          password: 'Password is required',
          auth: null,
        },
        isSubmitting: false,
        hasSubmitted: true,
        handleInputChange: mockHandleInputChange,
        handleInputBlur: mockHandleInputBlur,
        handleSubmit: mockHandleSubmit,
      });

      renderWithProviders(<LoginPage />);

      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    it('should display authentication error when present', () => {
      vi.mocked(useSignInForm).mockReturnValue({
        formData: mockFormData,
        errors: {
          email: '',
          password: '',
          auth: 'Invalid credentials',
        },
        isSubmitting: false,
        hasSubmitted: true,
        handleInputChange: mockHandleInputChange,
        handleInputBlur: mockHandleInputBlur,
        handleSubmit: mockHandleSubmit,
      });

      renderWithProviders(<LoginPage />);

      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('should mark form fields as error when errors exist and form has been submitted', () => {
      vi.mocked(useSignInForm).mockReturnValue({
        formData: mockFormData,
        errors: {
          email: 'Email is invalid',
          password: 'Password is required',
          auth: null,
        },
        isSubmitting: false,
        hasSubmitted: true,
        handleInputChange: mockHandleInputChange,
        handleInputBlur: mockHandleInputBlur,
        handleSubmit: mockHandleSubmit,
      });

      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      // Check if inputs have error styling (aria-invalid attribute)
      expect(emailInput.closest('.MuiTextField-root')).toHaveClass('Mui-error');
      expect(passwordInput.closest('.MuiTextField-root')).toHaveClass('Mui-error');
    });
  });

  describe('loading states', () => {
    it('should disable submit button and show loading text when submitting', () => {
      vi.mocked(useSignInForm).mockReturnValue({
        formData: { email: 'test@example.com', password: 'password123' },
        errors: mockErrors,
        isSubmitting: true,
        hasSubmitted: false,
        handleInputChange: mockHandleInputChange,
        handleInputBlur: mockHandleInputBlur,
        handleSubmit: mockHandleSubmit,
      });

      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Signing in...');
    });

    it('should enable submit button and show default text when not submitting', () => {
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeEnabled();
      expect(submitButton).toHaveTextContent('Sign in');
    });
  });

  describe('accessibility', () => {
    it('should have proper form structure', () => {
      renderWithProviders(<LoginPage />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();

      // Check for form inputs by placeholder
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should have proper button role and type', () => {
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should have proper alt text for all images', () => {
      renderWithProviders(<LoginPage />);

      // All images should have meaningful alt text
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('responsive design', () => {
    it('should render with proper container constraints', () => {
      renderWithProviders(<LoginPage />);

      // The main container should be present - check for MUI Container
      const container = document.querySelector('.MuiContainer-root');
      expect(container).toBeInTheDocument();
    });

    it('should have responsive styling for form elements', () => {
      renderWithProviders(<LoginPage />);

      // Form should have max-width constraint for better UX
      const form = document.querySelector('form');
      expect(form).toHaveStyle({ maxWidth: '412px' });
    });
  });
});
