'use client';

import React from 'react';

import { useStepField } from '../../hooks/useStepField';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface EmailStepProps {
  onBack: () => void;
  onNext: () => void;
  onEmailChange?: (email: string, isValid: boolean) => void;
  email?: string;
}

export default function EmailStep({
  onBack,
  onNext,
  onEmailChange,
  email: emailProp = '',
}: EmailStepProps) {
  const { isValid, handleValueChange, handleValidationChange } = useStepField(
    emailProp,
    onEmailChange,
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
        value={emailProp}
        onChange={handleValueChange}
        onValidChange={handleValidationChange}
        required
      />
    </PageContainer>
  );
}
