import { useCallback, useState } from 'react';

import { useAuth } from './useAuth';

const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  if (!email) {
    return 'Email is required';
  }

  return '';
};

const validatePassword = (password: string): string => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
    return 'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  if (!password) {
    return 'Password is required';
  }

  return '';
};

const validateField = (field: string, value: string): string => {
  switch (field) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return '';
  }
};

export const useSignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { login, isLoading, error, clearError } = useAuth();

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      if (errors[field as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }

      if (error) {
        clearError();
      }
    },
    [errors, error, clearError],
  );

  const handleInputBlur = useCallback((field: string, value: string) => {
    const fieldError = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setHasSubmitted(true);

      const newErrors = {
        email: validateField('email', formData.email),
        password: validateField('password', formData.password),
      };
      setErrors(newErrors);

      const isValid = !newErrors.email && !newErrors.password;

      if (isValid) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      }
    },
    [formData, login],
  );

  return {
    formData,
    errors: { ...errors, auth: error },
    isSubmitting: isLoading,
    hasSubmitted,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
  };
};
