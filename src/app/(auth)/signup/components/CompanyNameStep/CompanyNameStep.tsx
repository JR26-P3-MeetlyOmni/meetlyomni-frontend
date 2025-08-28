'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import BackButton from '../SignupComponents/BackButton';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import NextButton from '../SignupComponents/NextButton';
import { PageTitle } from '../SignupComponents/PageLabel';

interface CompanyNameStepProps {
  onBack?: () => void;
  onCompanyNameChange?: (companyName: string, isValid: boolean) => void;
  onNext?: () => void;
  canGoNext?: boolean;
}

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
}));

export function CompanyNameStep({
  onBack,
  onCompanyNameChange,
  onNext,
  canGoNext = false,
}: CompanyNameStepProps) {
  const [companyName, setCompanyName] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const handleCompanyNameChange = React.useCallback(
    (value: string) => {
      setCompanyName(value);
      onCompanyNameChange?.(value, isValid);
    },
    [isValid, onCompanyNameChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onCompanyNameChange?.(companyName, valid);
    },
    [companyName, onCompanyNameChange],
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
        title="What's Your Company Name?"
        subtitle="Enter the name of your organization or company"
      />
      <ValidatedInput
        kind="company"
        label="Company Name:"
        placeholder="Enter your company name"
        value={companyName}
        onChange={handleCompanyNameChange}
        onValidChange={handleValidationChange}
        required
      />

      <ButtonContainer>
        <NextButton onClick={handleNext} disabled={!canGoNext} />
      </ButtonContainer>
    </div>
  );
}

export default CompanyNameStep;
