import React from 'react';

import { useFormData } from './useFormData';
import { useStepState } from './useStepState';

export type Step = 'company' | 'email' | 'password' | 'contact';

export function useStepManager() {
  const stepState = useStepState();
  const formData = useFormData();

  const canGoTo = React.useCallback(
    (target: Step) => {
      if (target === 'company') return true;
      if (target === 'email') return formData.companyValid;
      if (target === 'password') return formData.companyValid && formData.emailValid;
      if (target === 'contact')
        return formData.companyValid && formData.emailValid && formData.passwordValid;
      return false;
    },
    [formData.companyValid, formData.emailValid, formData.passwordValid],
  );

  return {
    ...stepState,
    ...formData,
    canGoTo,
  };
}
