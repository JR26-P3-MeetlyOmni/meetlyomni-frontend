'use client';

import React from 'react';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface EmailStepProps {
  onBack: () => void;
  onNext: () => void;
  onEmailChange?: (email: string, isValid: boolean) => void;
}

export default function EmailStep({ onBack, onNext, onEmailChange }: EmailStepProps) {
  const [email, setEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const handleEmailChange = React.useCallback(
    (value: string) => {
      setEmail(value);
      onEmailChange?.(value, isValid);
    },
    [isValid, onEmailChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onEmailChange?.(email, valid);
    },
    [email, onEmailChange],
  );

  const handleNext = React.useCallback(() => {
    if (isValid) onNext();
  }, [isValid, onNext]);

  return (
    <PageContainer
      title="Please Enter Your Email Address"
      subtitle="This email address will be used as your primary account"
      onBack={onBack}
      onNext={handleNext}
      nextDisabled={!isValid}
    >
      <ValidatedInput
        kind="email"
        label="Email:"
        placeholder="123456@gmail.com"
        value={email}
        onChange={handleEmailChange}
        onValidChange={handleValidationChange}
        required
      />
    </PageContainer>
  );
}
