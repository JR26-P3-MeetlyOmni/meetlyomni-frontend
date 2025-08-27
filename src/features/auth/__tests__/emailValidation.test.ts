import { describe, expect, it } from 'vitest';

import { validateEmail } from '../utils/emailValidation';

describe('emailValidation', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com',
        'user@subdomain.example.com',
        'user@example-domain.com',
        'user@example.com.',
        'user@example.com-',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '', // Empty string
        'invalid-email', // No @ symbol
        '@example.com', // No local part
        'user@', // No domain
        'user@.com', // No domain name
        'user name@example.com', // Space in local part
        'user@example com', // Space in domain
        'user@example.com ', // Trailing space
        ' user@example.com', // Leading space
        'user@@example.com', // Double @
        'user@example@com', // Multiple @
        'user@example', // No TLD
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      // Very long email
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.com';
      expect(validateEmail(longEmail)).toBe(true);

      // Very short email
      expect(validateEmail('a@b.c')).toBe(true);

      // Email with special characters in local part
      expect(validateEmail('user+tag@example.com')).toBe(true);
      expect(validateEmail('user.tag@example.com')).toBe(true);
      expect(validateEmail('user_tag@example.com')).toBe(true);

      // Email with numbers
      expect(validateEmail('user123@example.com')).toBe(true);
      expect(validateEmail('123user@example.com')).toBe(true);
    });

    it('should handle null and undefined', () => {
      // @ts-expect-error - Testing invalid input
      expect(validateEmail(null)).toBe(false);
      // @ts-expect-error - Testing invalid input
      expect(validateEmail(undefined)).toBe(false);
    });
  });
});
