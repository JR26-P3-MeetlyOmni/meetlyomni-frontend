'use client';

import React from 'react';

import { ValidatedInput } from './components/SignupComponents/FieldInput';
import PageContainer from './components/SignupComponents/PageContainer';

export default function SignupPage() {
  const [email, setEmail] = React.useState('');
  const [emailValid, setEmailValid] = React.useState(false);

  const handleEmail = React.useCallback((val: string) => {
    setEmail(val);
  }, []);

  const handleEmailValid = React.useCallback((ok: boolean) => {
    setEmailValid(ok);
  }, []);

  const handleBack = React.useCallback(() => {
    // TODO: navigate to previous step
  }, []);

  const handleNext = React.useCallback(() => {
    // TODO: navigate to next step
  }, []);

  return (
    <PageContainer
      title="Please Enter Your Email Address"
      subtitle="This email address will be used as your primary account"
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!emailValid}
    >
      <ValidatedInput
        kind="email"
        label="Email:"
        placeholder="123456@gmail.com"
        value={email}
        onChange={handleEmail}
        onValidChange={handleEmailValid}
        required
      />
    </PageContainer>
  );
}
