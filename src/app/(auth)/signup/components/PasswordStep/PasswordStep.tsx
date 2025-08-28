'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import BackButton from '../SignupComponents/BackButton';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import NextButton from '../SignupComponents/NextButton';
import { PageTitle } from '../SignupComponents/PageLabel';

interface PasswordStepProps {
  onBack?: () => void;
  onPasswordChange?: (password: string, isValid: boolean) => void;
  onNext?: () => void;
  canGoNext?: boolean;
}

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
}));

export function PasswordStep({
  onBack,
  onPasswordChange,
  onNext,
  canGoNext = false,
}: PasswordStepProps) {
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
    if (canGoNext && onNext) {
      onNext();
    }
  }, [canGoNext, onNext]);

  return (
    <div>
      <BackButton onClick={onBack} />
      <PageTitle
        title="Create a Secure Password"
        subtitle="Your password should be strong and unique to protect your account"
      />
      <ValidatedInput
        kind="password"
        label="Password:"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        onValidChange={handleValidationChange}
        required
      />

      <ButtonContainer>
        <NextButton onClick={handleNext} disabled={!canGoNext} />
      </ButtonContainer>
    </div>
  );
}

export default PasswordStep;
