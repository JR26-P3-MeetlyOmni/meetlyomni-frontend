import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ConfirmPasswordField from '../components/passwordReset/ConfirmPasswordField';

// Mock the Auth components with safe DOM props and endAdornment rendering
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  StyledSectionLabel: ({ children }: { children: React.ReactNode }) => (
    <label data-testid="section-label">{children}</label>
  ),
  StyledTextField: ({ error, helperText, InputProps, fullWidth, size, ...rest }: any) => (
    <div>
      <input data-testid="confirm-password-input" {...rest} />
      {InputProps?.endAdornment}
    </div>
  ),
}));

// Mock MUI icons
vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => <span data-testid="visibility-off-icon">VisibilityOff</span>,
}));

describe('ConfirmPasswordField', () => {
  const defaultProps = {
    confirmPassword: '',
    showConfirmPassword: false,
    isSubmitting: false,
    hasError: false,
    errorMessage: '',
    onConfirmPasswordChange: vi.fn(),
    onToggleVisibility: vi.fn(),
  };

  it('renders with correct label', () => {
    render(<ConfirmPasswordField {...defaultProps} />);

    expect(screen.getByTestId('section-label')).toHaveTextContent('Repeat new password to confirm');
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });

  it('shows password when showConfirmPassword is true', () => {
    render(<ConfirmPasswordField {...defaultProps} showConfirmPassword={true} />);

    const input = screen.getByTestId('confirm-password-input');
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('visibility-off-icon')).toBeInTheDocument();
  });

  it('hides password when showConfirmPassword is false', () => {
    render(<ConfirmPasswordField {...defaultProps} showConfirmPassword={false} />);

    const input = screen.getByTestId('confirm-password-input');
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('visibility-icon')).toBeInTheDocument();
  });

  it('calls onConfirmPasswordChange when input changes', () => {
    const mockOnChange = vi.fn();
    render(<ConfirmPasswordField {...defaultProps} onConfirmPasswordChange={mockOnChange} />);

    const input = screen.getByTestId('confirm-password-input');
    fireEvent.change(input, { target: { value: 'test123' } });

    expect(mockOnChange).toHaveBeenCalledWith('test123');
  });

  it('calls onToggleVisibility when visibility button is clicked', () => {
    const mockOnToggle = vi.fn();
    render(<ConfirmPasswordField {...defaultProps} onToggleVisibility={mockOnToggle} />);

    const button = screen.getByLabelText('toggle confirm password visibility');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    expect(() => render(<ConfirmPasswordField {...defaultProps} />)).not.toThrow();
  });
});
