import { useCallback, useState } from 'react';

import { validateField, validateLoginForm } from '../validation/validators';
import { useAuth } from './useAuth';
import { useLogin } from './useLogin';

export const useSignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { isLoading, error, clearError } = useAuth();
  const { login } = useLogin();

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

      const newErrors = validateLoginForm(formData.email, formData.password);
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
