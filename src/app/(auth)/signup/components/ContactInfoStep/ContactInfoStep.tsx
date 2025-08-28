'use client';

import React from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import BackButton from '../SignupComponents/BackButton';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import { PageTitle } from '../SignupComponents/PageLabel';

interface ContactInfoStepProps {
  onBack?: () => void;
  onContactInfoChange?: (email: string, isEmailValid: boolean) => void;
  onSubmit?: () => void;
  canSubmit?: boolean;
}

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  minWidth: '120px',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
}));

export function ContactInfoStep({
  onBack,
  onContactInfoChange,
  onSubmit,
  canSubmit = false,
}: ContactInfoStepProps) {
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const handleEmailChange = React.useCallback(
    (value: string) => {
      setEmail(value);
      onContactInfoChange?.(value, isEmailValid);
    },
    [isEmailValid, onContactInfoChange],
  );

  const handleEmailValidationChange = React.useCallback(
    (valid: boolean) => {
      setIsEmailValid(valid);
      onContactInfoChange?.(email, valid);
    },
    [email, onContactInfoChange],
  );

  const handleSubmit = React.useCallback(() => {
    if (canSubmit && onSubmit) {
      onSubmit();
    }
  }, [canSubmit, onSubmit]);

  return (
    <div>
      <BackButton onClick={onBack} />
      <PageTitle
        title="Contact Information"
        subtitle="Provide your contact details to complete your registration"
      />
      <FormContainer>
        <ValidatedInput
          kind="email"
          label="Contact Email:"
          placeholder="Enter your contact email"
          value={email}
          onChange={handleEmailChange}
          onValidChange={handleEmailValidationChange}
          required
        />
      </FormContainer>

      <ButtonContainer>
        <SubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          完成注册
        </SubmitButton>
      </ButtonContainer>
    </div>
  );
}

export default ContactInfoStep;
