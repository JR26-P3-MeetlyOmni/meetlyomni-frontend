import React from 'react';

import { useClient } from './useClient';
import { useLocalStorage } from './useLocalStorage';
import { type Step } from './useStepManager';

export function useStepState() {
  const isClient = useClient();
  const { setItem, cleanupOldData } = useLocalStorage();

  const [step, setStep] = React.useState<Step>('company');
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load step from localStorage after component mounts
  React.useEffect(() => {
    if (!isClient) {
      setIsLoaded(true);
      return;
    }

    // Clean up old format data first
    cleanupOldData();

    // Always start from 'company' step on page refresh
    // This ensures a fresh start every time the page is loaded
    setStep('company');

    setIsLoaded(true);
  }, [isClient, cleanupOldData]);

  // Save step to localStorage
  const saveStep = React.useCallback(
    (newStep: Step) => {
      setItem('signupCurrentStep', newStep);
    },
    [setItem],
  );

  const goBack = React.useCallback(() => {
    setStep(prev => {
      let newStep: Step;
      if (prev === 'email') newStep = 'company';
      else if (prev === 'password') newStep = 'email';
      else if (prev === 'contact') newStep = 'password';
      else newStep = prev;

      saveStep(newStep);
      return newStep;
    });
  }, [saveStep]);

  const goNext = React.useCallback(() => {
    setStep(prev => {
      let newStep: Step;
      if (prev === 'company') newStep = 'email';
      else if (prev === 'email') newStep = 'password';
      else if (prev === 'password') newStep = 'contact';
      else newStep = prev;

      saveStep(newStep);
      return newStep;
    });
  }, [saveStep]);

  // Update step directly and save to localStorage
  const setStepAndSave = React.useCallback(
    (newStep: Step) => {
      setStep(newStep);
      saveStep(newStep);
    },
    [saveStep],
  );

  return {
    step,
    isLoaded,
    setStep: setStepAndSave,
    goBack,
    goNext,
  };
}
