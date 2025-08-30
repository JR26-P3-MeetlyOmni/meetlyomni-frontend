'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

import { useStepField } from '../../hooks/useStepField';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import NextButton from '../SignupComponents/NextButton';
import { PageTitle } from '../SignupComponents/PageLabel';
import type { CompanyNameStepProps } from './type';

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

export function CompanyNameStep({
  onCompanyNameChange,
  onNext,
  companyName: companyNameProp = '',
}: CompanyNameStepProps) {
  const { isValid, handleValueChange, handleValidationChange } = useStepField(
    companyNameProp,
    onCompanyNameChange,
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
          onChange={handleValueChange}
          onValidChange={handleValidationChange}
          required
        />
      </InputPositioner>

      <NextButton onClick={handleNext} disabled={!isValid} />
    </CenterContainer>
  );
}

export default CompanyNameStep;
