import { useCallback } from 'react';

import type { FormData, FormErrors, ValidationRule } from '../types';

const VALIDATION_RULES: Record<keyof FormData, ValidationRule[]> = {
  email: [
    { test: value => !!value.trim(), message: 'Email is required' },
    {
      test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email',
    },
  ],
  password: [
    { test: value => !!value.trim(), message: 'Password is required' },
    { test: value => value.length >= 6, message: 'Password must be at least 6 characters' },
  ],
};

const validateFormData = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  Object.entries(VALIDATION_RULES).forEach(([fieldName, rules]) => {
    const field = fieldName as keyof FormData;
    const value = formData[field];

    for (const rule of rules) {
      if (!rule.test(value)) {
        errors[field] = rule.message;
        break; // Stop at first failing rule
      }
    }
  });

  return errors;
};

export const useFormValidation = (
  formData: FormData,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
) => {
  return useCallback((): boolean => {
    const newErrors = validateFormData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, setErrors]);
};
