import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import PasswordValidation from '../components/passwordReset/PasswordValidation';

// Mock the Auth components
vi.mock('@/components/Auth/AuthFormComponents', () => ({
  ValidationContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="validation-container">{children}</div>
  ),
  ValidationText: ({ children, isValid }: { children: React.ReactNode; isValid: boolean }) => (
    <div data-testid="validation-text" data-valid={isValid}>
      {children}
    </div>
  ),
}));

describe('PasswordValidation', () => {
  const defaultProps = {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: true,
    isStrong: false,
  };

  it('does not render when hasInput is false', () => {
    render(<PasswordValidation {...defaultProps} hasInput={false} />);

    expect(screen.queryByTestId('validation-container')).not.toBeInTheDocument();
  });

  it('does not render when isStrong is true', () => {
    render(<PasswordValidation {...defaultProps} isStrong={true} />);

    expect(screen.queryByTestId('validation-container')).not.toBeInTheDocument();
  });

  it('renders validation rules when hasInput is true and isStrong is false', () => {
    render(<PasswordValidation {...defaultProps} />);

    expect(screen.getByTestId('validation-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('validation-text')).toHaveLength(3);
  });

  it('displays length validation rule', () => {
    render(<PasswordValidation {...defaultProps} />);

    expect(screen.getByText('✓ At least 12 characters')).toBeInTheDocument();
  });

  it('displays case validation rule', () => {
    render(<PasswordValidation {...defaultProps} />);

    expect(
      screen.getByText('✓ At least 1 uppercase letter & 1 lowercase letter'),
    ).toBeInTheDocument();
  });

  it('displays number and special character validation rule', () => {
    render(<PasswordValidation {...defaultProps} />);

    expect(screen.getByText('✓ At least 1 number & 1 special character')).toBeInTheDocument();
  });

  it('shows correct validation state for length requirement', () => {
    const { rerender } = render(<PasswordValidation {...defaultProps} isLengthOk={false} />);

    let lengthRule = screen
      .getByText('✓ At least 12 characters')
      .closest('[data-testid="validation-text"]');
    expect(lengthRule).toHaveAttribute('data-valid', 'false');

    rerender(<PasswordValidation {...defaultProps} isLengthOk={true} />);

    lengthRule = screen
      .getByText('✓ At least 12 characters')
      .closest('[data-testid="validation-text"]');
    expect(lengthRule).toHaveAttribute('data-valid', 'true');
  });

  it('shows correct validation state for case requirement', () => {
    const { rerender } = render(<PasswordValidation {...defaultProps} isCaseOk={false} />);

    let caseRule = screen
      .getByText('✓ At least 1 uppercase letter & 1 lowercase letter')
      .closest('[data-testid="validation-text"]');
    expect(caseRule).toHaveAttribute('data-valid', 'false');

    rerender(<PasswordValidation {...defaultProps} isCaseOk={true} />);

    caseRule = screen
      .getByText('✓ At least 1 uppercase letter & 1 lowercase letter')
      .closest('[data-testid="validation-text"]');
    expect(caseRule).toHaveAttribute('data-valid', 'true');
  });

  it('shows correct validation state for number and special character requirement', () => {
    const { rerender } = render(<PasswordValidation {...defaultProps} isNumSpecialOk={false} />);

    let numSpecialRule = screen
      .getByText('✓ At least 1 number & 1 special character')
      .closest('[data-testid="validation-text"]');
    expect(numSpecialRule).toHaveAttribute('data-valid', 'false');

    rerender(<PasswordValidation {...defaultProps} isNumSpecialOk={true} />);

    numSpecialRule = screen
      .getByText('✓ At least 1 number & 1 special character')
      .closest('[data-testid="validation-text"]');
    expect(numSpecialRule).toHaveAttribute('data-valid', 'true');
  });
});
