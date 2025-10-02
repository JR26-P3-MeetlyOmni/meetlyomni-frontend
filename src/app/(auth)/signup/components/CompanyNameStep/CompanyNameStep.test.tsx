import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { useStepField } from '../../hooks/useStepField';
import { CompanyNameStep } from './CompanyNameStep';
import type { CompanyNameStepProps } from './type';

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
        data-testid="company-name-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={() => onValidChange?.(true)}
      />
    </div>
  ),
}));

vi.mock('../SignupComponents/NextButton', () => ({
  default: ({ onClick, disabled, children }: any) => (
    <button data-testid="next-button" onClick={onClick} disabled={disabled}>
      {children || 'Next'}
    </button>
  ),
}));

vi.mock('../SignupComponents/PageLabel', () => ({
  PageTitle: ({ title }: any) => <h1 data-testid="page-title">{title}</h1>,
}));

describe('CompanyNameStep', () => {
  const defaultProps: CompanyNameStepProps = {
    companyName: '',
    onCompanyNameChange: vi.fn(),
    onNext: vi.fn(),
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
      render(<CompanyNameStep {...defaultProps} />);

      // Check if main elements are rendered
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toHaveTextContent('Welcome to Omni');

      expect(screen.getByTestId('validated-input')).toBeInTheDocument();
      expect(screen.getByTestId('company-name-input')).toBeInTheDocument();
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('should render with company name value', () => {
      render(<CompanyNameStep {...defaultProps} companyName="Google" />);

      const input = screen.getByTestId('company-name-input') as HTMLInputElement;
      expect(input.value).toBe('Google');
    });

    it('should render with empty company name by default', () => {
      render(<CompanyNameStep {...defaultProps} />);

      const input = screen.getByTestId('company-name-input') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('Input Field', () => {
    it('should display correct label and placeholder', () => {
      render(<CompanyNameStep {...defaultProps} />);

      expect(screen.getByText('Company Name:')).toBeInTheDocument();

      const input = screen.getByTestId('company-name-input') as HTMLInputElement;
      expect(input.placeholder).toBe('Google');
    });

    it('should call onCompanyNameChange when input value changes', () => {
      const mockOnCompanyNameChange = vi.fn();
      const mockHandleValueChange = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: mockHandleValueChange,
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} onCompanyNameChange={mockOnCompanyNameChange} />);

      const input = screen.getByTestId('company-name-input');
      fireEvent.change(input, { target: { value: 'Microsoft' } });

      expect(mockHandleValueChange).toHaveBeenCalledWith('Microsoft');
    });
  });

  describe('Next Button', () => {
    it('should be disabled when company name is invalid', () => {
      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(true);
    });

    it('should be enabled when company name is valid', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(false);
    });

    it('should call onNext when clicked and company name is valid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('should not call onNext when clicked and company name is invalid', () => {
      const mockOnNext = vi.fn();

      (useStepField as any).mockReturnValue({
        isValid: false,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).not.toHaveBeenCalled();
    });
  });

  describe('useStepField Hook Integration', () => {
    it('should call useStepField with correct parameters', () => {
      render(<CompanyNameStep {...defaultProps} companyName="Apple" />);

      expect(useStepField).toHaveBeenCalledWith('Apple', defaultProps.onCompanyNameChange);
    });

    it('should call useStepField with empty string when companyName is not provided', () => {
      render(<CompanyNameStep onCompanyNameChange={vi.fn()} onNext={vi.fn()} />);

      expect(useStepField).toHaveBeenCalledWith('', expect.any(Function));
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined onNext prop', () => {
      (useStepField as any).mockReturnValue({
        isValid: true,
        handleValueChange: vi.fn(),
        handleValidationChange: vi.fn(),
      });

      render(<CompanyNameStep {...defaultProps} onNext={undefined} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      // Should not throw error when onNext is undefined
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('should handle undefined onCompanyNameChange prop', () => {
      render(<CompanyNameStep {...defaultProps} onCompanyNameChange={undefined} />);

      expect(useStepField).toHaveBeenCalledWith('', undefined);
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<CompanyNameStep {...defaultProps} />);

      expect(screen.getByText('Company Name:')).toBeInTheDocument();
      expect(screen.getByTestId('company-name-input')).toBeInTheDocument();
    });

    it('should have proper button labeling', () => {
      render(<CompanyNameStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button');
      expect(nextButton).toHaveTextContent('Next');
    });
  });
});
