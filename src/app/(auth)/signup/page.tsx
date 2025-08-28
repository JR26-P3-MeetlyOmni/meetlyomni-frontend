'use client';

import React from 'react';

import PasswordStep from './components/PasswordStep/PasswordStep';

export default function SignupPage() {
  const handleBack = React.useCallback(() => {
    // Handle back logic
    // TODO: Implement navigation logic
  }, []);

  const handleNext = React.useCallback(() => {
    // Handle next logic
    // TODO: Implement navigation logic
  }, []);

  return <PasswordStep onBack={handleBack} onNext={handleNext} />;
}
