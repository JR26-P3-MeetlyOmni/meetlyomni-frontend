import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import PasswordField from '../components/passwordReset/PasswordField';

// Mock the Auth components with safe DOM props and endAdornment rendering
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  StyledSectionLabel: ({ children }: { children: React.ReactNode }) => (
    <label data-testid="section-label">{children}</label>
  ),
  StyledTextField: ({ error, helperText, slotProps, fullWidth, size, ...rest }: any) => (
    <div>
      <input data-testid="password-input" {...rest} />
      {slotProps?.input?.endAdornment}
      {error && helperText && <span data-testid="error-message">{helperText}</span>}
    </div>
  ),
}));

// Mock MUI icons
vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => <span data-testid="visibility-off-icon">VisibilityOff</span>,
}));

describe('PasswordField', () => {
  const defaultProps = {
    type: 'new' as const,
    value: '',
    showPassword: false,
    isSubmitting: false,
    onChange: vi.fn(),
    onToggleVisibility: vi.fn(),
  };

  describe('New Password Field', () => {
    it('renders with correct label and placeholder', () => {
      render(<PasswordField {...defaultProps} type="new" />);

      expect(screen.getByTestId('section-label')).toHaveTextContent('Enter new password');
      expect(screen.getByTestId('password-input')).toHaveAttribute(
        'placeholder',
        'Enter new password',
      );
    });

    it('calls onChange when input value changes', () => {
      const mockOnChange = vi.fn();
      render(<PasswordField {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByTestId('password-input');
      fireEvent.change(input, { target: { value: 'newpassword' } });

      expect(mockOnChange).toHaveBeenCalledWith('newpassword');
    });
  });

  describe('Confirm Password Field', () => {
    it('renders with correct label and placeholder', () => {
      render(<PasswordField {...defaultProps} type="confirm" />);

      expect(screen.getByTestId('section-label')).toHaveTextContent(
        'Repeat new password to confirm',
      );
      expect(screen.getByTestId('password-input')).toHaveAttribute(
        'placeholder',
        'Confirm password',
      );
    });

    it('displays error message when hasError is true', () => {
      render(
        <PasswordField
          {...defaultProps}
          type="confirm"
          hasError={true}
          errorMessage="Passwords do not match"
        />,
      );

      expect(screen.getByTestId('error-message')).toHaveTextContent('Passwords do not match');
    });
  });

  describe('Password Visibility', () => {
    it('toggles password visibility when button is clicked', () => {
      const mockToggle = vi.fn();
      render(<PasswordField {...defaultProps} onToggleVisibility={mockToggle} />);

      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);

      expect(mockToggle).toHaveBeenCalled();
    });

    it('shows correct icon when password is hidden', () => {
      render(<PasswordField {...defaultProps} showPassword={false} />);

      expect(screen.getByTestId('visibility-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('visibility-off-icon')).not.toBeInTheDocument();
    });

    it('shows correct icon when password is visible', () => {
      render(<PasswordField {...defaultProps} showPassword={true} />);

      expect(screen.getByTestId('visibility-off-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('visibility-icon')).not.toBeInTheDocument();
    });

    it('sets input type to text when password is visible', () => {
      render(<PasswordField {...defaultProps} showPassword={true} />);

      expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'text');
    });

    it('sets input type to password when password is hidden', () => {
      render(<PasswordField {...defaultProps} showPassword={false} />);

      expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
    });
  });

  describe('Form States', () => {
    it('disables input when isSubmitting is true', () => {
      render(<PasswordField {...defaultProps} isSubmitting={true} />);

      expect(screen.getByTestId('password-input')).toBeDisabled();
    });

    it('enables input when isSubmitting is false', () => {
      render(<PasswordField {...defaultProps} isSubmitting={false} />);

      expect(screen.getByTestId('password-input')).not.toBeDisabled();
    });
  });
});
