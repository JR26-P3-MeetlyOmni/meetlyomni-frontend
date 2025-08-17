import { AUTH_MESSAGES } from '../constants/messages';

export const validateEmail = (email: string): string => {
  if (!email) {
    return AUTH_MESSAGES.EMAIL_REQUIRED;
  }

  const emailRegex = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]+$/;
  if (!emailRegex.test(email)) {
    return AUTH_MESSAGES.EMAIL_INVALID;
  }

  return '';
};
