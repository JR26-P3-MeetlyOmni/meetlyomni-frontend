import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import PasswordField from '../components/passwordReset/NewPasswordField';

// Mock the Auth components with safe DOM props and endAdornment rendering
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  StyledSectionLabel: ({ children }: { children: React.ReactNode }) => (
    <label data-testid="section-label">{children}</label>
  ),
  StyledTextField: ({ error, helperText, InputProps, fullWidth, size, ...rest }: any) => (
    <div>
      <input data-testid="password-input" {...rest} />
      {InputProps?.endAdornment}
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
    password: '',
    showPassword: false,
    isSubmitting: false,
    onPasswordChange: vi.fn(),
    onToggleVisibility: vi.fn(),
  };

  it('renders with correct label', () => {
    render(<PasswordField {...defaultProps} />);

    expect(screen.getByTestId('section-label')).toHaveTextContent('Enter new password');
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('shows password when showPassword is true', () => {
    render(<PasswordField {...defaultProps} showPassword={true} />);

    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByTestId('visibility-off-icon')).toBeInTheDocument();
  });

  it('hides password when showPassword is false', () => {
    render(<PasswordField {...defaultProps} showPassword={false} />);

    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByTestId('visibility-icon')).toBeInTheDocument();
  });

  it('calls onPasswordChange when input changes', () => {
    const mockOnChange = vi.fn();
    render(<PasswordField {...defaultProps} onPasswordChange={mockOnChange} />);

    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'test123' } });

    expect(mockOnChange).toHaveBeenCalledWith('test123');
  });

  it('calls onToggleVisibility when visibility button is clicked', () => {
    const mockOnToggle = vi.fn();
    render(<PasswordField {...defaultProps} onToggleVisibility={mockOnToggle} />);

    const button = screen.getByLabelText('toggle password visibility');
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    expect(() => render(<PasswordField {...defaultProps} />)).not.toThrow();
  });
});
