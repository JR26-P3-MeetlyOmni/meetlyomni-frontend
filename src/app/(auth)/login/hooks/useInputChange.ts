import { useCallback } from 'react';

import type { FormData, FormErrors, LoginState } from '../types';

export const useInputChange = (
  errors: FormErrors,
  loginState: LoginState,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
  setLoginState: React.Dispatch<React.SetStateAction<LoginState>>,
) => {
  return useCallback(
    (field: keyof FormData) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }

        if (loginState.error) {
          setLoginState(prev => ({ ...prev, error: null }));
        }
      };
    },
    [errors, loginState.error, setFormData, setErrors, setLoginState],
  );
};
