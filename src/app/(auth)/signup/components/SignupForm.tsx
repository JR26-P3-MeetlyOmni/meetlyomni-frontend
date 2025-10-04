'use client';

import { type Step } from '@/features/signup/signupSlice';

import React from 'react';

import { useReduxSignupForm } from '../hooks/useReduxSignupForm';
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
    handleCompanyChange,
    handleEmailChange,
    handlePasswordChange,
    handleContactChange,
    handleSubmit,
    canGoTo,
    isLoading,
  } = useReduxSignupForm();

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
        onCompanyNameChange={handleCompanyChange}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onContactChange={handleContactChange}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <StepDots steps={steps} activeStep={step} onStepChange={setStep} canGoToStep={canGoTo} />
    </>
  );
}
