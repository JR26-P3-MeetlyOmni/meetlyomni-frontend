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

const validateFields = (formData: { email: string; password: string }) => {
  const newErrors = { email: '', password: '' };
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    newErrors.password =
      'Password must be at least 8 characters with uppercase, lowercase, and number';
  }
  return newErrors;
};

const validateAndSubmit = async (
  formData: { email: string; password: string },
  setErrors: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  handleSuccess: () => void,
) => {
  const newErrors = validateFields(formData);
  setErrors(newErrors);
  if (!newErrors.email && !newErrors.password) {
    setIsSubmitting(true);
    try {
      handleSuccess();
    } finally {
      setIsSubmitting(false);
    }
  }
};

export const useSignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSuccess = () => {
    alert('Sign in successful! Redirecting to dashboard...');
    // Example: router.push('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await validateAndSubmit(formData, setErrors, setIsSubmitting, handleSuccess);
  };

  const isFormValid = useMemo((): boolean => {
    return (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      validateEmail(formData.email) &&
      validatePassword(formData.password)
    );
  }, [formData.email, formData.password]);

  return {
    formData,
    errors,
    showPassword,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
    setShowPassword,
  };
};
