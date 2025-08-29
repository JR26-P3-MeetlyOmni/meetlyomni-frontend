'use client';

import React from 'react';

import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';

interface ContactInfoStepProps {
  onBack: () => void;
  onNext: () => void;
  onChange?: (name: string, phone: string, valid: boolean) => void;
  contactName?: string;
  phone?: string;
}

function useContactInfo(onChange?: (name: string, phone: string, valid: boolean) => void) {
  const latestNameRef = React.useRef<string>('');
  const latestPhoneRef = React.useRef<string>('');
  const [nameValid, setNameValid] = React.useState(false);
  const [phoneValid, setPhoneValid] = React.useState(false);

  const isFormValid = nameValid && phoneValid;

  const handleName = React.useCallback(
    (v: string) => {
      latestNameRef.current = v;
      onChange?.(v, latestPhoneRef.current, nameValid && phoneValid);
    },
    [onChange, nameValid, phoneValid],
  );

  const handleNameValid = React.useCallback(
    (ok: boolean) => {
      setNameValid(ok);
      onChange?.(latestNameRef.current, latestPhoneRef.current, ok && phoneValid);
    },
    [onChange, phoneValid],
  );

  const handlePhone = React.useCallback(
    (v: string) => {
      latestPhoneRef.current = v;
      onChange?.(latestNameRef.current, v, nameValid && phoneValid);
    },
    [onChange, nameValid, phoneValid],
  );

  const handlePhoneValid = React.useCallback(
    (ok: boolean) => {
      setPhoneValid(ok);
      onChange?.(latestNameRef.current, latestPhoneRef.current, nameValid && ok);
    },
    [onChange, nameValid],
  );

  return {
    isFormValid,
    handleName,
    handleNameValid,
    handlePhone,
    handlePhoneValid,
  } as const;
}

export default function ContactInfoStep({
  onBack,
  onNext,
  onChange,
  contactName: contactNameProp = '',
  phone: phoneProp = '',
}: ContactInfoStepProps) {
  const { isFormValid, handleName, handleNameValid, handlePhone, handlePhoneValid } =
    useContactInfo(onChange);

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
        value={contactNameProp}
        onChange={handleName}
        onValidChange={handleNameValid}
        required
      />
      <ValidatedInput
        kind="phone"
        label="Contact phone number:"
        placeholder="0XXXXXXXXX"
        value={phoneProp}
        onChange={handlePhone}
        onValidChange={handlePhoneValid}
        required
      />
    </PageContainer>
  );
}
