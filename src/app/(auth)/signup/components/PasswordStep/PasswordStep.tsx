'use client';

import React from 'react';

import { useStepField } from '../../hooks/useStepField';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';
import type { PasswordStepProps } from './type';

export function PasswordStep({
  onBack,
  onPasswordChange,
  onNext,
  password: passwordProp = '',
}: PasswordStepProps) {
  const { isValid, handleValueChange, handleValidationChange } = useStepField(
    passwordProp,
    onPasswordChange,
  );

  const handleNext = React.useCallback(() => {
    if (isValid && onNext) onNext();
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
        onChange={handleValueChange}
        onValidChange={handleValidationChange}
        required
      />
    </PageContainer>
  );
}

export default PasswordStep;
