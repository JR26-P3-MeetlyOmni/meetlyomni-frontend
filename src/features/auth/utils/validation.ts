import type { PasswordValidation } from '../types';

/**
 * Validates email format using regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength according to app requirements
 * - At least 12 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export const validatePasswordStrength = (
  password: string,
  confirmPassword?: string
): PasswordValidation => {
  return {
    minLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    match: confirmPassword !== undefined 
      ? password === confirmPassword && password.length > 0 
      : true,
  };
};

/**
 * Checks if password meets all requirements
 */
export const isPasswordValid = (validation: PasswordValidation): boolean => {
  return Object.values(validation).every(v => v === true);
};

/**
 * Gets password strength score (0-5)
 */
export const getPasswordStrengthScore = (validation: PasswordValidation): number => {
  const scores = [
    validation.minLength,
    validation.hasUpper,
    validation.hasLower,
    validation.hasNumber,
    validation.hasSpecial,
  ];
  return scores.filter(Boolean).length;
};

/**
 * Gets password strength label and color
 */
export const getPasswordStrengthMeta = (
  score: number
): { label: string; color: 'error' | 'warning' | 'success' } => {
  if (score <= 2) return { label: 'Weak', color: 'error' };
  if (score <= 4) return { label: 'Medium', color: 'warning' };
  return { label: 'Strong', color: 'success' };
};