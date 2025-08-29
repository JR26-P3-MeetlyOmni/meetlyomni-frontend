'use client';

import React from 'react';

import EmailStep from './components/EmailStep/EmailStep';

export default function SignupPage() {
  const handleBack = React.useCallback(() => {
    // Handle back logic
    // TODO: Implement navigation logic
  }, []);

  const handleNext = React.useCallback(() => {
    // Handle next logic
    // TODO: Implement navigation logic
  }, []);

  // return <PasswordStep onBack={handleBack} onNext={handleNext} />;
  return <EmailStep onBack={handleBack} onNext={handleNext} />;
  // return <ContactInfoStep onBack={handleBack} onNext={handleNext} />;
}
