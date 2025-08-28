'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import NextButton from '../SignupComponents/NextButton';
import { PageTitle } from '../SignupComponents/PageLabel';

interface EmailStepProps {
  onEmailChange?: (email: string, isValid: boolean) => void;
  onNext?: () => void;
  canGoNext?: boolean;
}

const StepContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
}));

const EmailStep = ({ onEmailChange, onNext, canGoNext = false }: EmailStepProps) => {
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
    if (canGoNext && onNext) {
      onNext();
    }
  }, [canGoNext, onNext]);

  return (
    <StepContainer>
      <PageTitle
        title="Please Enter Your Email Address"
        subtitle="This email address will be used as your primary account"
      />

      <ValidatedInput
        kind="email"
        label="Email:"
        placeholder="123456@gmail.com"
        value={email}
        onChange={handleEmailChange}
        onValidChange={handleValidationChange}
        required
      />

      <ButtonContainer>
        <NextButton onClick={handleNext} disabled={!canGoNext} />
      </ButtonContainer>
    </StepContainer>
  );
};

export default EmailStep;
