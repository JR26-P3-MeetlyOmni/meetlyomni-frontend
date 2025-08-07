import { useState } from 'react';

import { LoginStatus } from '../types';
import type { FormData, FormErrors, LoginState } from '../types';

export const useLoginFormState = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>({
    status: LoginStatus.IDLE,
    error: null,
  });

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    loginState,
    setLoginState,
  };
};
