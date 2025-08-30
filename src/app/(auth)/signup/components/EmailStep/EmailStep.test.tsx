import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { useStepField } from '../../hooks/useStepField';
import EmailStep from './EmailStep';
import type { EmailStepProps } from './type';

// Mock the useStepField hook
vi.mock('../../hooks/useStepField', () => ({
  useStepField: vi.fn(),
}));

// Mock the child components
vi.mock('../SignupComponents/FieldInput', () => ({
  ValidatedInput: ({ label, placeholder, value, onChange, onValidChange }: any) => (
    <div data-testid="validated-input">
      <label>{label}</label>
      <input
        data-testid="email-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={() => onValidChange?.(true)}
      />
    </div>
  ),
}));

vi.mock('../SignupComponents/PageContainer', () => ({
  default: ({ title, subtitle, children, onBack, onNext, nextDisabled }: any) => (
    <div data-testid="page-container">
      <h1 data-testid="page-title">{title}</h1>
      {subtitle && <p data-testid="page-subtitle">{subtitle}</p>}
      <div data-testid="form-content">{children}</div>
      <button data-testid="back-button" onClick={onBack}>
        Back
      </button>
      <button data-testid="next-button" onClick={onNext} disabled={nextDisabled}>
        Next
      </button>
    </div>
  ),
}));

describe('EmailStep', () => {
  const defaultProps: EmailStepProps = {
    email: '',
    onBack: vi.fn(),
    onNext: vi.fn(),
    onEmailChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation for useStepField
    (useStepField as any).mockReturnValue({
      isValid: false,
      handleValueChange: vi.fn(),
      handleValidationChange: vi.fn(),
    });
  });

  describe('Rendering', () => {
    it('should render the component with all elements', () => {
      render(<EmailStep {...defaultProps} />);

      // Check if main elements are rendered
      expect(screen.getByTestId('page-container')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByText('Please Enter Your Email Address')).toBeInTheDocument();
      expect(screen.getByTestId('page-subtitle')).toBeInTheDocument();
      expect(
        screen.getByText('This email address will be used as your primary account'),
      ).toBeInTheDocument();

      expect(screen.getByTestId('form-content')).toBeInTheDocument();
      expect(screen.getByTestId('validated-input')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();

      expect(screen.getByTestId('back-button')).toBeInTheDocument();
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('should render with email value', () => {
      render(<EmailStep {...defaultProps} email="user@example.com" />);

      const input = screen.getByTestId('email-input') as HTMLInputElement;
      expect(input.value).toBe('user@example.com');
    });

    it('should render with empty email by default', () => {
      render(<EmailStep {...defaultProps} />);

      const input = screen.getByTestId('email-input') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('Input Field', () => {
    it('should display correct label and placeholder', () => {
      render(<EmailStep {...defaultProps} />);

      expect(screen.getByText('Email:')).toBeInTheDocument();

      const input = screen.getByTestId('email-input') as HTMLInputElement;
      expect(input.placeholder).toBe('123456@gmail.com');
    });

    it('should call onEmailChange when input value changes', () => {
      const mockOnEmailChange = vi.fn();
      const mockHandleValueChange = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: mockHandleValueChange,
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} onEmailChange={mockOnEmailChange} />);

      const input = screen.getByTestId('email-input');
      fireEvent.change(input, { target: { value: 'new@example.com' } });

      expect(mockHandleValueChange).toHaveBeenCalledWith('new@example.com');
    });
  });

  describe('Navigation Buttons', () => {
    it('should call onBack when back button is clicked', () => {
      const mockOnBack = vi.fn();
      render(<EmailStep {...defaultProps} onBack={mockOnBack} />);

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should call onNext when next button is clicked and email is valid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('should not call onNext when next button is clicked and email is invalid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should disable next button when email is invalid', () => {
      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(true);
    });

    it('should enable next button when email is valid', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(false);
    });
  });

  describe('useStepField Hook Integration', () => {
    it('should call useStepField with correct parameters', () => {
      render(<EmailStep {...defaultProps} email="test@example.com" />);

      expect(useStepField).toHaveBeenCalledWith('test@example.com', defaultProps.onEmailChange);
    });

    it('should call useStepField with empty string when email is not provided', () => {
      render(<EmailStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useStepField).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined onEmailChange prop', () => {
      render(<EmailStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useStepField).toHaveBeenCalledWith('', undefined);
    });

    it('should handle undefined onNext prop', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<EmailStep {...defaultProps} onNext={undefined} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      // Should not throw error when onNext is undefined
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<EmailStep {...defaultProps} />);

      expect(screen.getByText('Email:')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });

    it('should have proper button labeling', () => {
      render(<EmailStep {...defaultProps} />);

      const backButton = screen.getByTestId('back-button');
      const nextButton = screen.getByTestId('next-button');

      expect(backButton).toHaveTextContent('Back');
      expect(nextButton).toHaveTextContent('Next');
    });

    it('should have proper page title and subtitle', () => {
      render(<EmailStep {...defaultProps} />);

      expect(screen.getByText('Please Enter Your Email Address')).toBeInTheDocument();
      expect(
        screen.getByText('This email address will be used as your primary account'),
      ).toBeInTheDocument();
    });
  });
});
