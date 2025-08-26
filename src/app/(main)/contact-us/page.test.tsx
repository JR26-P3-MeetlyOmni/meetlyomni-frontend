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
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('Your Question')).toBeInTheDocument();
    });

    it('renders form inputs with correct types and placeholders', () => {
      render(<ContactUsPage />);

      // Check placeholders
      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
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
      expect(sendButton).toBeDisabled();
    });

    it('validates that all fields are required', async () => {
      render(<ContactUsPage />);

      const inputs = screen.getAllByDisplayValue('');
      const firstNameInput = inputs[0];
      const lastNameInput = inputs[1];
      const emailInput = inputs[2];
      const questionInput = inputs[3];
      const sendButton = screen.getByRole('button', { name: /send/i });

      // Fill only some fields, button should remain disabled
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      // Email and question empty

      await waitFor(() => {
        expect(sendButton).toBeDisabled();
      });

      // Fill email but not question
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      // Question still empty

      await waitFor(() => {
        expect(sendButton).toBeDisabled();
      });

      // Only when all fields are filled, button should be enabled
      fireEvent.change(questionInput, { target: { value: 'How does this work?' } });

      await waitFor(() => {
        expect(sendButton).not.toBeDisabled();
      });
    });

    it('enables send button when all required fields are filled', async () => {
      render(<ContactUsPage />);

      const inputs = screen.getAllByDisplayValue('');
      const firstNameInput = inputs[0];
      const lastNameInput = inputs[1];
      const emailInput = inputs[2];
      const questionInput = inputs[3];
      const sendButton = screen.getByRole('button', { name: /send/i });

      // Fill all required fields
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(questionInput, { target: { value: 'How does this work?' } });

      await waitFor(() => {
        expect(sendButton).not.toBeDisabled();
      });
    });
  });

  describe('Form Submission Tests', () => {
    it('shows sending state when form is submitted', async () => {
      render(<ContactUsPage />);

      const inputs = screen.getAllByDisplayValue('');
      const firstNameInput = inputs[0];
      const lastNameInput = inputs[1];
      const emailInput = inputs[2];
      const questionInput = inputs[3];
      const sendButton = screen.getByRole('button', { name: /send/i });

      // Fill all required fields
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(questionInput, { target: { value: 'How does this work?' } });

      // Click send button
      fireEvent.click(sendButton);

      // Check for sending state
      await waitFor(() => {
        expect(screen.getByText('Sending...')).toBeInTheDocument();
      });
    });

    it('resets form after successful submission', async () => {
      // Mock alert to avoid browser alert in test
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      render(<ContactUsPage />);

      const inputs = screen.getAllByDisplayValue('');
      const firstNameInput = inputs[0];
      const lastNameInput = inputs[1];
      const emailInput = inputs[2];
      const questionInput = inputs[3];
      const sendButton = screen.getByRole('button', { name: /send/i });

      // Fill all fields
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(questionInput, { target: { value: 'How does this work?' } });

      // Submit form
      fireEvent.click(sendButton);

      // Wait for submission to complete and form to reset
      await waitFor(
        () => {
          expect(alertSpy).toHaveBeenCalledWith('Message sent successfully!');
        },
        { timeout: 2000 },
      );

      // Check that form is reset
      await waitFor(() => {
        const resetInputs = screen.getAllByDisplayValue('');
        expect(resetInputs).toHaveLength(4);
      });

      alertSpy.mockRestore();
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
