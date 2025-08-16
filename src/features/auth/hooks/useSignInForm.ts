import { useState, useMemo } from 'react';
import { useAuth } from './useAuth';

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

const validateField = (field: string, value: string): string => {
  if (field === 'email') {
    if (!value) {
      return 'Email is required';
    }
    if (!validateEmail(value)) {
      return 'Please enter a valid email address';
    }
  } else if (field === 'password') {
    if (!value) {
      return 'Password is required';
    }
    if (!validatePassword(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
  }
  return '';
};

export const useSignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading, error, clearError } = useAuth();
  const isSubmitting = isLoading;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear form error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleInputBlur = (field: string, value: string) => {
    const newError = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: newError }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      await login({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const isFormValid = useMemo((): boolean => {
    return formData.email.length > 0 && 
      formData.password.length > 0 && 
      validateEmail(formData.email) && 
      validatePassword(formData.password);
  }, [formData.email, formData.password]);

  return {
    formData,
    errors: { ...errors, auth: error },
    showPassword,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
    setShowPassword,
  };
};
