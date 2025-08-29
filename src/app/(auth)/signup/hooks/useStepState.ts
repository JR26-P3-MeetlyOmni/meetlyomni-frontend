import React from 'react';

import { type Step } from './useStepManager';

export function useStepState() {
  const [step, setStep] = React.useState<Step>('company');

  const goBack = React.useCallback(() => {
    setStep(prev => {
      if (prev === 'email') return 'company';
      if (prev === 'password') return 'email';
      if (prev === 'contact') return 'password';
      return prev;
    });
  }, []);

  const goNext = React.useCallback(() => {
    setStep(prev => {
      if (prev === 'company') return 'email';
      if (prev === 'password') return 'contact';
      if (prev === 'email') return 'password';
      return prev;
    });
  }, []);

  return {
    step,
    setStep,
    goBack,
    goNext,
  };
}
