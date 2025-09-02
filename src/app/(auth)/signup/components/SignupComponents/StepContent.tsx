'use client';

import React from 'react';

import { type Step } from '../../hooks/useStepManager';
import { CompanyNameStep } from '../CompanyNameStep/CompanyNameStep';
import ContactInfoStep from '../ContactInfoStep/ContactInfoStep';
import EmailStep from '../EmailStep/EmailStep';
import { PasswordStep } from '../PasswordStep/PasswordStep';

interface StepContentProps {
  step: Step;
  companyName: string;
  email: string;
  password: string;
  contactName: string;
  phone: string;
  onCompanyNameChange: (name: string, isValid: boolean) => void;
  onEmailChange: (email: string, isValid: boolean) => void;
  onPasswordChange: (password: string, isValid: boolean) => void;
  onContactChange: (name: string, phone: string, isValid: boolean) => void;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  errorMessage?: string | null;
}

export default function StepContent({
  step,
  companyName,
  email,
  password,
  contactName,
  phone,
  onCompanyNameChange,
  onEmailChange,
  onPasswordChange,
  onContactChange,
  onBack,
  onNext,
  onSubmit,
  errorMessage,
}: StepContentProps) {
  if (step === 'company') {
    return (
      <CompanyNameStep
        onCompanyNameChange={onCompanyNameChange}
        onNext={onNext}
        companyName={companyName}
      />
    );
  }

  if (step === 'email') {
    return (
      <EmailStep onBack={onBack} onNext={onNext} onEmailChange={onEmailChange} email={email} />
    );
  }

  if (step === 'password') {
    return (
      <PasswordStep
        onBack={onBack}
        onNext={onNext}
        onPasswordChange={onPasswordChange}
        password={password}
      />
    );
  }

  return (
    <ContactInfoStep
      onBack={onBack}
      onNext={onSubmit}
      onChange={onContactChange}
      contactName={contactName}
      phone={phone}
      errorMessage={errorMessage}
    />
  );
}
