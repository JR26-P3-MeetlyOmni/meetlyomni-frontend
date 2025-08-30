import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { useStepField } from '../../hooks/useStepField';
import PasswordStep from './PasswordStep';
import type { PasswordStepProps } from './type';

// Mock the useStepField hook
vi.mock('../../hooks/useStepField', () => ({
  useStepField: vi.fn(),
}));

// Mock the child components
vi.mock('../SignupComponents/FieldInput', () => ({
  ValidatedInput: ({ label, placeholder, value, onChange, onValidChange, required }: any) => (
    <div data-testid="validated-input">
      <label>{label}</label>
      <input
        data-testid="password-input"
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={() => onValidChange?.(true)}
        required={required}
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

describe('PasswordStep', () => {
  const defaultProps: PasswordStepProps = {
    password: '',
    onBack: vi.fn(),
    onNext: vi.fn(),
    onPasswordChange: vi.fn(),
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
      render(<PasswordStep {...defaultProps} />);

      // Check if main elements are rendered
      expect(screen.getByTestId('page-container')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByText('Please Set Your Password to Log in')).toBeInTheDocument();
      expect(screen.getByTestId('page-subtitle')).toBeInTheDocument();
      expect(
        screen.getByText('Your password should no less than 12 characters'),
      ).toBeInTheDocument();

      expect(screen.getByTestId('form-content')).toBeInTheDocument();
      expect(screen.getByTestId('validated-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();

      expect(screen.getByTestId('back-button')).toBeInTheDocument();
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('should render with password value', () => {
      render(<PasswordStep {...defaultProps} password="MyPassword123" />);

      const input = screen.getByTestId('password-input') as HTMLInputElement;
      expect(input.value).toBe('MyPassword123');
    });

    it('should render with empty password by default', () => {
      render(<PasswordStep {...defaultProps} />);

      const input = screen.getByTestId('password-input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should render password input with correct type', () => {
      render(<PasswordStep {...defaultProps} />);

      const input = screen.getByTestId('password-input') as HTMLInputElement;
      expect(input.type).toBe('password');
    });
  });

  describe('Input Field', () => {
    it('should display correct label and placeholder', () => {
      render(<PasswordStep {...defaultProps} />);

      expect(screen.getByText('Password:')).toBeInTheDocument();

      const input = screen.getByTestId('password-input') as HTMLInputElement;
      expect(input.placeholder).toBe('Enter your password');
    });

    it('should call onPasswordChange when input value changes', () => {
      const mockOnPasswordChange = vi.fn();
      const mockHandleValueChange = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: mockHandleValueChange,
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} onPasswordChange={mockOnPasswordChange} />);

      const input = screen.getByTestId('password-input');
      fireEvent.change(input, { target: { value: 'NewPassword123' } });

      expect(mockHandleValueChange).toHaveBeenCalledWith('NewPassword123');
    });
  });

  describe('Navigation Buttons', () => {
    it('should call onBack when back button is clicked', () => {
      const mockOnBack = vi.fn();
      render(<PasswordStep {...defaultProps} onBack={mockOnBack} />);

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should call onNext when next button is clicked and password is valid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('should not call onNext when next button is clicked and password is invalid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should disable next button when password is invalid', () => {
      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(true);
    });

    it('should enable next button when password is valid', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(false);
    });
  });

  describe('useStepField Hook Integration', () => {
    it('should call useStepField with correct parameters', () => {
      render(<PasswordStep {...defaultProps} password="TestPassword123" />);

      expect(useStepField).toHaveBeenCalledWith('TestPassword123', defaultProps.onPasswordChange);
    });

    it('should call useStepField with empty string when password is not provided', () => {
      render(<PasswordStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useStepField).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined onPasswordChange prop', () => {
      render(<PasswordStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useStepField).toHaveBeenCalledWith('', undefined);
    });

    it('should handle undefined onNext prop', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<PasswordStep {...defaultProps} onNext={undefined} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      // Should not throw error when onNext is undefined
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<PasswordStep {...defaultProps} />);

      expect(screen.getByText('Password:')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
    });

    it('should have proper button labeling', () => {
      render(<PasswordStep {...defaultProps} />);

      const backButton = screen.getByTestId('back-button');
      const nextButton = screen.getByTestId('next-button');

      expect(backButton).toHaveTextContent('Back');
      expect(nextButton).toHaveTextContent('Next');
    });

    it('should have proper page title and subtitle', () => {
      render(<PasswordStep {...defaultProps} />);

      expect(screen.getByText('Please Set Your Password to Log in')).toBeInTheDocument();
      expect(
        screen.getByText('Your password should no less than 12 characters'),
      ).toBeInTheDocument();
    });

    it('should have password input with proper security attributes', () => {
      render(<PasswordStep {...defaultProps} />);

      const input = screen.getByTestId('password-input') as HTMLInputElement;
      expect(input.type).toBe('password');
      expect(input).toHaveAttribute('required');
    });
  });
});
