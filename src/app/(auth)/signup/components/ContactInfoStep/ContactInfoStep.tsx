'use client';

import React from 'react';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface ContactInfoStepProps {
  onBack: () => void;
  onNext: () => void;
  onChange?: (name: string, phone: string, valid: boolean) => void;
}

function useContactInfo(onChange?: (name: string, phone: string, valid: boolean) => void) {
  const [contactName, setContactName] = React.useState('');
  const [contactNameValid, setContactNameValid] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [phoneValid, setPhoneValid] = React.useState(false);

  const isFormValid = contactNameValid && phoneValid;

  const handleName = React.useCallback(
    (v: string) => {
      setContactName(v);
      onChange?.(v, phone, contactNameValid && phoneValid);
    },
    [onChange, phone, contactNameValid, phoneValid],
  );

  const handleNameValid = React.useCallback(
    (ok: boolean) => {
      setContactNameValid(ok);
      onChange?.(contactName, phone, ok && phoneValid);
    },
    [onChange, contactName, phone, phoneValid],
  );

  const handlePhone = React.useCallback(
    (v: string) => {
      setPhone(v);
      onChange?.(contactName, v, contactNameValid && phoneValid);
    },
    [onChange, contactName, contactNameValid, phoneValid],
  );

  const handlePhoneValid = React.useCallback(
    (ok: boolean) => {
      setPhoneValid(ok);
      onChange?.(contactName, phone, contactNameValid && ok);
    },
    [onChange, contactName, phone, contactNameValid],
  );

  return {
    contactName,
    contactNameValid,
    phone,
    phoneValid,
    isFormValid,
    handleName,
    handleNameValid,
    handlePhone,
    handlePhoneValid,
  } as const;
}

export default function ContactInfoStep({ onBack, onNext, onChange }: ContactInfoStepProps) {
  const {
    contactName,
    // contactNameValid, // unused
    phone,
    // phoneValid, // unused
    isFormValid,
    handleName,
    handleNameValid,
    handlePhone,
    handlePhoneValid,
  } = useContactInfo(onChange);

  const handleNext = React.useCallback(() => {
    if (isFormValid) onNext();
  }, [isFormValid, onNext]);

  return (
    <PageContainer
      title="Please Enter Your Contact Information"
      onBack={onBack}
      onNext={handleNext}
      nextDisabled={!isFormValid}
    >
      <ValidatedInput
        kind="contactName"
        label="Contact name:"
        placeholder="Alex Li"
        value={contactName}
        onChange={handleName}
        onValidChange={handleNameValid}
        required
      />
      <ValidatedInput
        kind="phone"
        label="Contact phone number:"
        placeholder="0XXXXXXXXX"
        value={phone}
        onChange={handlePhone}
        onValidChange={handlePhoneValid}
        required
      />
    </PageContainer>
  );
}
