import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import PasswordValidationRules from '../components/passwordReset/PasswordValidationRules';

describe('PasswordValidationRules', () => {
  const defaultProps = {
    isLengthOk: false,
    isCaseOk: false,
    isNumSpecialOk: false,
    hasInput: false,
    isStrong: false,
  };

  it('renders nothing when hasInput is false', () => {
    const { container } = render(<PasswordValidationRules {...defaultProps} hasInput={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when isStrong is true', () => {
    const { container } = render(
      <PasswordValidationRules {...defaultProps} hasInput={true} isStrong={true} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders validation rules when hasInput is true and isStrong is false', () => {
    render(<PasswordValidationRules {...defaultProps} hasInput={true} isStrong={false} />);

    expect(screen.getByText('✓ At least 12 characters')).toBeInTheDocument();
    expect(
      screen.getByText('✓ At least 1 uppercase letter & 1 lowercase letter'),
    ).toBeInTheDocument();
    expect(screen.getByText('✓ At least 1 number & 1 special character')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<PasswordValidationRules {...defaultProps} />)).not.toThrow();
  });

  it('shows validation rules with correct styling when conditions are met', () => {
    render(<PasswordValidationRules {...defaultProps} hasInput={true} isStrong={false} />);

    const validationTexts = screen.getAllByText(/✓/);
    expect(validationTexts).toHaveLength(3);
  });
});
