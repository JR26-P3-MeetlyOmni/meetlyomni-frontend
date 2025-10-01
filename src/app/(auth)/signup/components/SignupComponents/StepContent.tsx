'use client';

import { type Step } from '@/features/signup/signupSlice';

import React, { Suspense } from 'react';

// Lazy load step components for better performance
const CompanyNameStep = React.lazy(() =>
  import('../CompanyNameStep/CompanyNameStep').then(module => ({
    default: module.CompanyNameStep,
  })),
);
const ContactInfoStep = React.lazy(() => import('../ContactInfoStep/ContactInfoStep'));
const EmailStep = React.lazy(() => import('../EmailStep/EmailStep'));
const PasswordStep = React.lazy(() =>
  import('../PasswordStep/PasswordStep').then(module => ({ default: module.PasswordStep })),
);

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
const stepComponents = {
  company: CompanyNameStep,
  email: EmailStep,
  password: PasswordStep,
  contact: ContactInfoStep,
} as const;

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

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            fontSize: '16px',
            color: '#666',
          }}
        >
          Loading...
        </div>
      }
    >
      <Component {...(componentProps as Record<string, unknown>)} />
    </Suspense>
  );
}
