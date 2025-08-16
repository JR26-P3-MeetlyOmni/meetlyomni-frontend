import { validateEmail } from './email';
import { validatePassword } from './password';

export const validateField = (field: string, value: string): string => {
  switch (field) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return '';
  }
};

export const validateLoginForm = (email: string, password: string) => {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
};
