import { describe, expect, it } from 'vitest';

import { validatePassword } from './password';
import { AUTH_MESSAGES } from '../constants/messages';

describe('validatePassword', () => {
  describe('when password is valid', () => {
    it('should return empty string for valid passwords', () => {
      const validPasswords = [
        'Password123',
        'SecurePass1',
        'MyStrongPwd9',
        'ValidPassword2023',
        'P@ssw0rd123',
        'Abcdefgh1',
      ];

      validPasswords.forEach(password => {
        expect(validatePassword(password)).toBe('');
      });
    });
  });

  describe('when password is empty', () => {
    it('should return required error message for empty string', () => {
      expect(validatePassword('')).toBe(AUTH_MESSAGES.PASSWORD_REQUIRED);
    });

    it('should return invalid error message for whitespace only', () => {
      expect(validatePassword('   ')).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
    });
  });

  describe('when password is too short', () => {
    it('should return invalid error message for passwords less than 8 characters', () => {
      const shortPasswords = [
        'Pass1',
        'Abc123',
        'Short1',
        'Test12',
      ];

      shortPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
      });
    });
  });

  describe('when password lacks required character types', () => {
    it('should return invalid error message when missing uppercase letters', () => {
      const noUppercasePasswords = [
        'password123',
        'lowercase1',
        'nouppercasehere9',
      ];

      noUppercasePasswords.forEach(password => {
        expect(validatePassword(password)).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
      });
    });

    it('should return invalid error message when missing lowercase letters', () => {
      const noLowercasePasswords = [
        'PASSWORD123',
        'UPPERCASE1',
        'NOLOWERCASEHERE9',
      ];

      noLowercasePasswords.forEach(password => {
        expect(validatePassword(password)).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
      });
    });

    it('should return invalid error message when missing numbers', () => {
      const noNumberPasswords = [
        'PasswordWithoutNumber',
        'OnlyLetters',
        'NoDigitsHere',
      ];

      noNumberPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle exactly 8 characters with all requirements', () => {
      expect(validatePassword('Password1')).toBe('');
    });

    it('should handle very long passwords', () => {
      const longPassword = 'Password123' + 'a'.repeat(100);
      expect(validatePassword(longPassword)).toBe('');
    });

    it('should handle passwords with special characters', () => {
      const specialCharPasswords = [
        'Password123!',
        'MyPass123@',
        'Secure#Pass1',
        'Strong$Password2',
      ];

      specialCharPasswords.forEach(password => {
        expect(validatePassword(password)).toBe('');
      });
    });
  });
});
