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
}

// Table-driven configuration for steps
// Using unknown to avoid 'any' - type safety is ensured by the stepProps functions
const stepComponents: Record<Step, React.ComponentType<unknown>> = {
  company: CompanyNameStep as unknown as React.ComponentType<unknown>,
  email: EmailStep as unknown as React.ComponentType<unknown>,
  password: PasswordStep as unknown as React.ComponentType<unknown>,
  contact: ContactInfoStep as unknown as React.ComponentType<unknown>,
};

const stepProps = {
  company: (props: StepContentProps) => ({
    onCompanyNameChange: props.onCompanyNameChange,
    onNext: props.onNext,
    companyName: props.companyName,
  }),
  email: (props: StepContentProps) => ({
    onBack: props.onBack,
    onNext: props.onNext,
    onEmailChange: props.onEmailChange,
    email: props.email,
  }),
  password: (props: StepContentProps) => ({
    onBack: props.onBack,
    onNext: props.onNext,
    onPasswordChange: props.onPasswordChange,
    password: props.password,
  }),
  contact: (props: StepContentProps) => ({
    onBack: props.onBack,
    onNext: props.onSubmit,
    onChange: props.onContactChange,
    contactName: props.contactName,
    phone: props.phone,
  }),
};

export default function StepContent(props: StepContentProps) {
  const { step } = props;

  // Get the component and its props from the configuration tables
  const Component = stepComponents[step] as React.ComponentType<Record<string, unknown>>;
  const componentProps = stepProps[step](props);

  return <Component {...(componentProps as Record<string, unknown>)} />;
}
