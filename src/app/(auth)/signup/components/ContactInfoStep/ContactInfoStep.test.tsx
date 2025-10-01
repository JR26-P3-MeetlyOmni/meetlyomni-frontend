import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { useContactFields } from '../../hooks/useContactFields';
import ContactInfoStep from './ContactInfoStep';
import type { ContactInfoStepProps } from './type';

// Mock the useContactFields hook
vi.mock('../../hooks/useContactFields', () => ({
  useContactFields: vi.fn(),
}));

// Mock the child components
vi.mock('../SignupComponents/FieldInput', () => ({
  ValidatedInput: ({ label, placeholder, value, onChange, onValidChange }: any) => (
    <div data-testid="validated-input">
      <label>{label}</label>
      <input
        data-testid={`${label.toLowerCase().replace(/\s+/g, '-')}-input`}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={() => onValidChange?.(true)}
      />
    </div>
  ),
}));

vi.mock('../SignupComponents/PageContainer', () => ({
  default: ({ title, children, onBack, onNext, nextDisabled }: any) => (
    <div data-testid="page-container">
      <h1 data-testid="page-title">{title}</h1>
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

describe('ContactInfoStep', () => {
  const defaultProps: ContactInfoStepProps = {
    contactName: '',
    phone: '',
    onBack: vi.fn(),
    onNext: vi.fn(),
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation for useContactFields
    (useContactFields as any).mockReturnValue({
      isFormValid: false,
      handleNameChange: vi.fn(),
      handleNameValidationChange: vi.fn(),
      handlePhoneChange: vi.fn(),
      handlePhoneValidationChange: vi.fn(),
    });
  });

  describe('Rendering', () => {
    it('should render the component with all elements', () => {
      render(<ContactInfoStep {...defaultProps} />);

      // Check if main elements are rendered
      expect(screen.getByTestId('page-container')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByText('Please Enter Your Contact Information')).toBeInTheDocument();

      expect(screen.getByTestId('form-content')).toBeInTheDocument();
      expect(screen.getAllByTestId('validated-input')).toHaveLength(2);
      expect(screen.getByTestId('contact-name:-input')).toBeInTheDocument();
      expect(screen.getByTestId('contact-phone-number:-input')).toBeInTheDocument();

      expect(screen.getByTestId('back-button')).toBeInTheDocument();
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    it('should render with contact info values', () => {
      render(<ContactInfoStep {...defaultProps} contactName="Alex Li" phone="0123456789" />);

      const nameInput = screen.getByTestId('contact-name:-input') as HTMLInputElement;
      const phoneInput = screen.getByTestId('contact-phone-number:-input') as HTMLInputElement;

      expect(nameInput.value).toBe('Alex Li');
      expect(phoneInput.value).toBe('0123456789');
    });

    it('should render with empty values by default', () => {
      render(<ContactInfoStep {...defaultProps} />);

      const nameInput = screen.getByTestId('contact-name:-input') as HTMLInputElement;
      const phoneInput = screen.getByTestId('contact-phone-number:-input') as HTMLInputElement;

      expect(nameInput.value).toBe('');
      expect(phoneInput.value).toBe('');
    });
  });

  describe('Input Fields', () => {
    it('should display correct labels and placeholders', () => {
      render(<ContactInfoStep {...defaultProps} />);

      expect(screen.getByText('Contact name:')).toBeInTheDocument();
      expect(screen.getByText('Contact phone number:')).toBeInTheDocument();

      const nameInput = screen.getByTestId('contact-name:-input') as HTMLInputElement;
      const phoneInput = screen.getByTestId('contact-phone-number:-input') as HTMLInputElement;

      expect(nameInput.placeholder).toBe('Alex Li');
      expect(phoneInput.placeholder).toBe('0XXXXXXXXX');
    });

    it('should call onChange when input values change', () => {
      const mockOnChange = vi.fn();
      const mockHandleNameChange = vi.fn();
      const mockHandlePhoneChange = vi.fn();

      (useContactFields as any).mockReturnValue({
        isFormValid: false,
        handleNameChange: mockHandleNameChange,
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: mockHandlePhoneChange,
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} onChange={mockOnChange} />);

      const nameInput = screen.getByTestId('contact-name:-input');
      const phoneInput = screen.getByTestId('contact-phone-number:-input');

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(phoneInput, { target: { value: '0987654321' } });

      expect(mockHandleNameChange).toHaveBeenCalledWith('John Doe');
      expect(mockHandlePhoneChange).toHaveBeenCalledWith('0987654321');
    });
  });

  describe('Navigation Buttons', () => {
    it('should call onBack when back button is clicked', () => {
      const mockOnBack = vi.fn();
      render(<ContactInfoStep {...defaultProps} onBack={mockOnBack} />);

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should call onNext when next button is clicked and form is valid', () => {
      const mockOnNext = vi.fn();

      (useContactFields as any).mockReturnValue({
        isFormValid: true,
        handleNameChange: vi.fn(),
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: vi.fn(),
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('should not call onNext when next button is clicked and form is invalid', () => {
      const mockOnNext = vi.fn();

      (useContactFields as any).mockReturnValue({
        isFormValid: false,
        handleNameChange: vi.fn(),
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: vi.fn(),
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} onNext={mockOnNext} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should disable next button when form is invalid', () => {
      (useContactFields as any).mockReturnValue({
        isFormValid: false,
        handleNameChange: vi.fn(),
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: vi.fn(),
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(true);
    });

    it('should enable next button when form is valid', () => {
      (useContactFields as any).mockReturnValue({
        isFormValid: true,
        handleNameChange: vi.fn(),
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: vi.fn(),
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} />);

      const nextButton = screen.getByTestId('next-button') as HTMLButtonElement;
      expect(nextButton.disabled).toBe(false);
    });
  });

  describe('useContactFields Hook Integration', () => {
    it('should call useContactFields with correct parameters', () => {
      render(<ContactInfoStep {...defaultProps} contactName="Alex" phone="1234567890" />);

      expect(useContactFields).toHaveBeenCalledWith('Alex', '1234567890', defaultProps.onChange);
    });

    it('should call useContactFields with empty strings when values are not provided', () => {
      render(<ContactInfoStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useContactFields).toHaveBeenCalledWith('', '', undefined);
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined onChange prop', () => {
      render(<ContactInfoStep onBack={vi.fn()} onNext={vi.fn()} />);

      expect(useContactFields).toHaveBeenCalledWith('', '', undefined);
    });

    it('should handle undefined onNext prop', () => {
      (useContactFields as any).mockReturnValue({
        isFormValid: true,
        handleNameChange: vi.fn(),
        handleNameValidationChange: vi.fn(),
        handlePhoneChange: vi.fn(),
        handlePhoneValidationChange: vi.fn(),
      });

      render(<ContactInfoStep {...defaultProps} onNext={undefined} />);

      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      // Should not throw error when onNext is undefined
      expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<ContactInfoStep {...defaultProps} />);

      expect(screen.getByText('Contact name:')).toBeInTheDocument();
      expect(screen.getByText('Contact phone number:')).toBeInTheDocument();
      expect(screen.getByTestId('contact-name:-input')).toBeInTheDocument();
      expect(screen.getByTestId('contact-phone-number:-input')).toBeInTheDocument();
    });

    it('should have proper button labeling', () => {
      render(<ContactInfoStep {...defaultProps} />);

      const backButton = screen.getByTestId('back-button');
      const nextButton = screen.getByTestId('next-button');

      expect(backButton).toHaveTextContent('Back');
      expect(nextButton).toHaveTextContent('Next');
    });
  });
});
