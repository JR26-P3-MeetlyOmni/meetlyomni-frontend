'use client';

import React from 'react';

import { useContactFields } from '../../hooks/useContactFields';
import { ValidatedInput } from '../SignupComponents/FieldInput';
import PageContainer from '../SignupComponents/PageContainer';
import type { ContactInfoStepProps } from './type';

// Removed the old useContactInfo function - now using useContactFields hook

export default function ContactInfoStep({
  onBack,
  onNext,
  onChange,
  contactName: contactNameProp = '',
  phone: phoneProp = '',
}: ContactInfoStepProps) {
  const {
    isFormValid,
    handleNameChange,
    handleNameValidationChange,
    handlePhoneChange,
    handlePhoneValidationChange,
  } = useContactFields(contactNameProp, phoneProp, onChange);

  const handleNext = React.useCallback(() => {
    if (isFormValid && onNext) onNext();
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
        onChange={handleNameChange}
        onValidChange={handleNameValidationChange}
        required
      />
      <ValidatedInput
        kind="phone"
        label="Contact phone number:"
        placeholder="0XXXXXXXXX"
        value={phoneProp}
        onChange={handlePhoneChange}
        onValidChange={handlePhoneValidationChange}
        required
      />
    </PageContainer>
  );
}
