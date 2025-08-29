'use client';

import React from 'react';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface PasswordStepProps {
  onBack: () => void;
  onPasswordChange?: (password: string, isValid: boolean) => void;
  onNext: () => void;
  password?: string;
}

export function PasswordStep({
  onBack,
  onPasswordChange,
  onNext,
  password: passwordProp = '',
}: PasswordStepProps) {
  const [isValid, setIsValid] = React.useState(false);
  const latestValueRef = React.useRef<string>(passwordProp);

  const handlePasswordChange = React.useCallback(
    (value: string) => {
      latestValueRef.current = value;
      onPasswordChange?.(value, isValid);
    },
    [isValid, onPasswordChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onPasswordChange?.(latestValueRef.current, valid);
    },
    [onPasswordChange],
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
        value={passwordProp}
        onChange={handlePasswordChange}
        onValidChange={handleValidationChange}
        required
      />
    </PageContainer>
  );
}

export default PasswordStep;
