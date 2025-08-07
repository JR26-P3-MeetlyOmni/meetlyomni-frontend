import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import type { LoginFormHook } from '../types';
import { LoginForm } from './LoginForm';

// Mock the form hook
const mockFormHook: LoginFormHook = {
  formData: {
    email: '',
    password: '',
  },
  errors: {},
  isLoading: false,
  loginState: {
    status: 'idle',
    error: null,
  },
  handleInputChange: vi.fn(),
  handleSubmit: vi.fn(),
};

const createFormHook = (overrides = {}) => ({
  ...mockFormHook,
  ...overrides,
});

describe('LoginForm Component', () => {
  describe('Basic Rendering', () => {
    it('should render the login form with all essential elements', () => {
      render(<LoginForm formHook={mockFormHook} />);

      // Check for form elements
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    });

    it('should display form fields with correct labels and placeholders', () => {
      render(<LoginForm formHook={mockFormHook} />);

      const emailField = screen.getByPlaceholderText('Email Address');
      const passwordField = screen.getByPlaceholderText('Password');

      expect(emailField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(emailField).toHaveAttribute('type', 'email');
      expect(passwordField).toHaveAttribute('type', 'password');
    });

    it('should render third party login buttons', () => {
      render(<LoginForm formHook={mockFormHook} />);

      expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
      expect(screen.getByText(/sign in with microsoft/i)).toBeInTheDocument();
    });

    it('should have correct form structure', () => {
      render(<LoginForm formHook={mockFormHook} />);

      const form = screen.getByRole('button', { name: /^sign in$/i }).closest('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Form States', () => {
    it('should show loading state when form is submitting', () => {
      const loadingFormHook = createFormHook({ isLoading: true });

      render(<LoginForm formHook={loadingFormHook} />);

      const submitButton = screen.getByRole('button', { name: /signing in/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('should display error message when login fails', () => {
      const errorFormHook = createFormHook({
        loginState: {
          status: 'error',
          error: 'Invalid credentials',
        },
      });

      render(<LoginForm formHook={errorFormHook} />);

      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveAttribute('aria-label', 'error');
    });

    it('should display success message when login succeeds', () => {
      const successFormHook = createFormHook({
        loginState: {
          status: 'success',
          error: null,
        },
      });

      render(<LoginForm formHook={successFormHook} />);

      expect(screen.getByText(/登录成功！正在跳转/i)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveAttribute('aria-label', 'success');
    });
  });

  describe('User Interactions', () => {
    it('should call handleSubmit when form is submitted', async () => {
      const mockHandleSubmit = vi.fn();
      const formHookWithSubmit = createFormHook({ handleSubmit: mockHandleSubmit });

      render(<LoginForm formHook={formHookWithSubmit} />);

      const submitButton = screen.getByRole('button', { name: /^sign in$/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});
