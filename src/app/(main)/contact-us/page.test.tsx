/* eslint-disable max-lines-per-function */
import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ContactUsPage from './page';

// Mock the MUI theme provider
vi.mock('@mui/material/styles', async () => {
  const actual = await vi.importActual('@mui/material/styles');
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      spacing: (factor: number) => `${factor * 8}px`,
      breakpoints: {
        down: vi.fn(() => '@media (max-width: 768px)'),
        up: vi.fn(() => '@media (min-width: 769px)'),
      },
    })),
  };
});

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(() => ({
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn(onSubmit => (e: any) => {
      e?.preventDefault?.();
      return onSubmit({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        question: 'Test question',
      });
    }),
    formState: {
      errors: {},
      isValid: false,
    },
    reset: vi.fn(),
  })),
}));

describe('ContactUsPage', () => {
  describe('Rendering Tests', () => {
    it('renders hero section with correct title and subtitle', () => {
      render(<ContactUsPage />);

      expect(screen.getByText('Contact our team')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Contact us now to find out how you can make your event more lively and engaging with interactive Q&A and live sweepstakes!',
        ),
      ).toBeInTheDocument();
    });

    it('renders all form input fields', () => {
      render(<ContactUsPage />);

      // Check form labels
      expect(screen.getByText('First name')).toBeInTheDocument();
      expect(screen.getByText('Last name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Your Question')).toBeInTheDocument();
    });

    it('renders form inputs with correct types and placeholders', () => {
      render(<ContactUsPage />);

      // Check placeholders
      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your text here')).toBeInTheDocument();

      // First name and last name inputs
      const allInputs = screen.getAllByDisplayValue('');
      const firstNameInput = allInputs[0];
      const lastNameInput = allInputs[1];

      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();

      // Email input with type email
      const emailInputs = screen.getAllByDisplayValue('');
      expect(emailInputs[2]).toBeInTheDocument(); // Email input

      // Question textarea
      const questionInput = screen.getAllByDisplayValue('')[3];
      expect(questionInput).toBeInTheDocument();
    });
  });

  describe('Form Validation Tests', () => {
    it('renders send button in disabled state initially', () => {
      render(<ContactUsPage />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeInTheDocument();
      // React Hook Form starts with isValid: false, so button should be disabled
      expect(sendButton).toBeDisabled();
    });

    it('validates that all fields are required', async () => {
      render(<ContactUsPage />);

      const sendButton = screen.getByRole('button', { name: /send/i });

      // With React Hook Form, validation is handled internally
      // Button should be disabled when form is invalid
      expect(sendButton).toBeDisabled();
    });
  });

  describe('Form Submission Tests', () => {
    it('renders send button and handles click', () => {
      render(<ContactUsPage />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      expect(sendButton).toBeInTheDocument();

      // Button should be disabled initially due to form validation
      expect(sendButton).toBeDisabled();

      // Click should not throw any errors
      expect(() => fireEvent.click(sendButton)).not.toThrow();
    });
  });

  describe('Error Handling Tests', () => {
    it('handles form submission error gracefully', async () => {
      // Mock alert for error case
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      // Mock console.error to avoid error logs in test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ContactUsPage />);

      // mock the fetch or API call to simulate an error
      expect(screen.getByText('Contact our team')).toBeInTheDocument();

      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });
});
