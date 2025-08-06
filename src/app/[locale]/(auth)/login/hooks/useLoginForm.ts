import { useCallback, useState } from 'react';

import type { FormData, FormErrors, LoginFormHook } from '../types';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFormData = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email';
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  return newErrors;
};

export const useLoginForm = (): LoginFormHook => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors = validateFormData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormData) => {
      return (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }
      };
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // TODO: Implement actual login logic
        // console.log('Login attempt:', { email: formData.email });
      } catch {
        // TODO: Handle login error properly
        // console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [validateForm],
  );

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
