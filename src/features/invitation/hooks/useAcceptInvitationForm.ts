import { useMemo, useState } from 'react';

// Validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return minLength && hasUpperCase && hasLowerCase && hasNumber;
};

export const useAcceptInvitationForm = (initialEmail?: string, initialToken?: string) => {
  const [formData, setFormData] = useState({
    email: initialEmail || '',
    password: '',
    token: initialToken || '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputBlur = (field: string, value: string) => {
    let newError = '';
    if (field === 'email') {
      if (!value) {
        newError = 'Email is required';
      } else if (!validateEmail(value)) {
        newError = 'Please enter a valid email address';
      }
    } else if (field === 'password') {
      if (!value) {
        newError = 'Password is required';
      } else if (!validatePassword(value)) {
        newError = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }
    }
    setErrors(prev => ({ ...prev, [field]: newError }));
  };

  const isFormValid = useMemo((): boolean => {
    return (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.token.length > 0 &&
      validateEmail(formData.email) &&
      validatePassword(formData.password)
    );
  }, [formData.email, formData.password, formData.token]);

  return {
    formData,
    errors,
    isFormValid,
    handleInputChange,
    handleInputBlur,
  };
};
