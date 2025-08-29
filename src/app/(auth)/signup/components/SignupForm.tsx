'use client';

import React from 'react';

import { type Step, useStepManager } from '../hooks/useStepManager';
import StepContent from './SignupComponents/StepContent';
import StepDots from './SignupComponents/StepDots';

export default function SignupForm() {
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
  } = useStepManager();

  const steps: Step[] = ['company', 'email', 'password', 'contact'];

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
      />
      <StepDots steps={steps} activeStep={step} onStepChange={setStep} canGoToStep={canGoTo} />
    </>
  );
}
