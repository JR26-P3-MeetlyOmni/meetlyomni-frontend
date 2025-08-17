import { describe, expect, it } from 'vitest';

import { validateEmail } from './email';
import { AUTH_MESSAGES } from '../constants/messages';

describe('validateEmail', () => {
  describe('when email is valid', () => {
    it('should return empty string for valid email', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first.last+tag@company.org',
        'test123@test123.com',
        'a@b.co',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe('');
      });
    });
  });

  describe('when email is empty', () => {
    it('should return required error message for empty string', () => {
      expect(validateEmail('')).toBe(AUTH_MESSAGES.EMAIL_REQUIRED);
    });

    it('should return invalid error message for whitespace only', () => {
      expect(validateEmail('   ')).toBe(AUTH_MESSAGES.EMAIL_INVALID);
    });
  });

  describe('when email format is invalid', () => {
    it('should return invalid error message for malformed emails', () => {
      const invalidEmails = [
        'invalid-email',
        'test@',
        '@domain.com',
        'test.domain.com',
        'test@@domain.com',
        'test@domain..com',
        'test @domain.com',
        'test@domain .com',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle extremely long email addresses', () => {
      const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com';
      expect(validateEmail(longEmail)).toBe('');
    });

    it('should handle emails with special characters', () => {
      const specialCharEmails = [
        'test+tag@example.com',
        'test.email@example.com',
        'test_email@example.com',
        'test-email@example.com',
      ];

      specialCharEmails.forEach(email => {
        expect(validateEmail(email)).toBe('');
      });
    });
  });
});
