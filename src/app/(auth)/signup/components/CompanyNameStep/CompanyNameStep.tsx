'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import NextButton from '../SignupComponents/NextButton';
import { PageTitle } from '../SignupComponents/PageLabel';

const CenterContainer = styled('div')(({ theme }) => ({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
}));

// Adjust only the input position without impacting others
const InputPositioner = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(58),
  alignSelf: 'center',
  // Responsive adjustments
  [theme.breakpoints.down('lg')]: {
    marginLeft: theme.spacing(40),
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: theme.spacing(20),
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

interface CompanyNameStepProps {
  onBack?: () => void;
  onCompanyNameChange?: (companyName: string, isValid: boolean) => void;
  onNext?: () => void;
  companyName?: string;
}

export function CompanyNameStep({
  onCompanyNameChange,
  onNext,
  companyName: companyNameProp = '',
}: CompanyNameStepProps) {
  const [isValid, setIsValid] = React.useState(false);
  const latestValueRef = React.useRef<string>(companyNameProp);

  const handleCompanyNameChange = React.useCallback(
    (value: string) => {
      latestValueRef.current = value;
      onCompanyNameChange?.(value, isValid);
    },
    [isValid, onCompanyNameChange],
  );

  const handleValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsValid(valid);
      onCompanyNameChange?.(latestValueRef.current, valid);
    },
    [onCompanyNameChange],
  );

  const handleNext = React.useCallback(() => {
    if (isValid && onNext) {
      onNext();
    }
  }, [isValid, onNext]);

  return (
    <CenterContainer>
      <PageTitle title="Welcome to Omni !  Let’s Sign up Your Profile" />
      <InputPositioner>
        <ValidatedInput
          kind="company"
          label="Company Name:"
          placeholder="Google"
          value={companyNameProp}
          onChange={handleCompanyNameChange}
          onValidChange={handleValidationChange}
          required
        />
      </InputPositioner>

      <NextButton onClick={handleNext} disabled={!isValid} />
    </CenterContainer>
  );
}

export default CompanyNameStep;
