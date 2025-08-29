'use client';

import React from 'react';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface PasswordStepProps {
  onBack: () => void;
  onPasswordChange?: (password: string, isValid: boolean) => void;
  onNext: () => void;
}

export function PasswordStep({ onBack, onPasswordChange, onNext }: PasswordStepProps) {
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const handlePasswordChange = React.useCallback(
    (value: string) => {
      setPassword(value);
      onPasswordChange?.(value, isValid);
    },
    [isValid, onPasswordChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onPasswordChange?.(password, valid);
    },
    [password, onPasswordChange],
  );

  const handleNext = React.useCallback(() => {
    if (isValid) onNext();
  }, [isValid, onNext]);

  return (
    <PageContainer
      title="Please Set Your Password to Log in"
      subtitle="Your password should no less than 12 characters"
      onBack={onBack}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <ValidatedInput
        kind="password"
        label="Password:"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        onValidChange={handleValidationChange}
        required
      />
    </PageContainer>
  );
}

export default PasswordStep;
