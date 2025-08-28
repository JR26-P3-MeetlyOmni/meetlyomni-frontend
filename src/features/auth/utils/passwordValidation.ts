import type { PasswordValidation } from '../types';

export const validatePasswordStrength = (
  password: string,
  confirmPassword?: string,
): PasswordValidation => {
  return {
    minLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    match:
      confirmPassword !== undefined ? password === confirmPassword && password.length > 0 : true,
  };
};

export const isPasswordValid = (validation: PasswordValidation): boolean => {
  return Object.values(validation).every(v => v === true);
};

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

export const getPasswordStrengthMeta = (
  score: number,
): { label: string; color: 'error' | 'warning' | 'success' } => {
  if (score <= 2) return { label: 'Weak', color: 'error' };
  if (score <= 4) return { label: 'Medium', color: 'warning' };
  return { label: 'Strong', color: 'success' };
};

export function getPasswordValidationState(password: string, confirmPassword: string) {
  const validation = validatePasswordStrength(password, confirmPassword);
  const isValidPassword = isPasswordValid(validation);
  const isLengthOk = validation.minLength;
  const isCaseOk = validation.hasUpper && validation.hasLower;
  const isNumSpecialOk = validation.hasNumber && validation.hasSpecial;
  const isStrong = isLengthOk && isCaseOk && isNumSpecialOk;
  const hasInput = password.length > 0;
  const strengthScore = getPasswordStrengthScore(validation);
  const strengthPercent = (strengthScore / 5) * 100;
  const strengthMeta = getPasswordStrengthMeta(strengthScore);

  return {
    validation,
    isValidPassword,
    isLengthOk,
    isCaseOk,
    isNumSpecialOk,
    isStrong,
    hasInput,
    strengthScore,
    strengthPercent,
    strengthMeta,
  };
}
