import { AUTH_MESSAGES } from '../constants/messages';

export const validatePassword = (password: string): string => {
  if (!password) {
    return AUTH_MESSAGES.PASSWORD_REQUIRED;
  }

  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
    return AUTH_MESSAGES.PASSWORD_INVALID;
  }

  return '';
};
