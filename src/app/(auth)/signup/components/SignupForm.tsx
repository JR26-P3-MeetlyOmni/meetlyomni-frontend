'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';

import { type Step, useStepManager } from '../hooks/useStepManager';
import StepContent from './SignupComponents/StepContent';
import StepDots from './SignupComponents/StepDots';

export default function SignupForm() {
  const router = useRouter();
  const {
    step,
    setStep,
    companyName,
    email,
    password,
    contactName,
    phone,
    goBack,
    goNext,
    handleCompany,
    handleEmail,
    handlePassword,
    handleContact,
    handleSubmit,
    canGoTo,
    success,
    error,
  } = useStepManager();

  const steps: Step[] = ['company', 'email', 'password', 'contact'];

  React.useEffect(() => {
    if (success) {
      const params = new URLSearchParams();
      if (email) params.set('email', email);
      router.push(`/email-sent-success?${params.toString()}`);
    }
  }, [success, router, email]);

  return (
    <>
      <StepContent
        step={step}
        companyName={companyName}
        email={email}
        password={password}
        contactName={contactName}
        phone={phone}
        onCompanyNameChange={handleCompany}
        onEmailChange={handleEmail}
        onPasswordChange={handlePassword}
        onContactChange={handleContact}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
        errorMessage={error}
      />
      <StepDots steps={steps} activeStep={step} onStepChange={setStep} canGoToStep={canGoTo} />
    </>
  );
}
