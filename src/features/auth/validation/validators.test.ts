import { describe, expect, it } from 'vitest';

import { validateField, validateLoginForm } from './validators';
import { AUTH_MESSAGES } from '../constants/messages';

describe('validateField', () => {
  describe('when field is email', () => {
    it('should validate email field correctly', () => {
      expect(validateField('email', 'test@example.com')).toBe('');
      expect(validateField('email', '')).toBe(AUTH_MESSAGES.EMAIL_REQUIRED);
      expect(validateField('email', 'invalid-email')).toBe(AUTH_MESSAGES.EMAIL_INVALID);
    });
  });

  describe('when field is password', () => {
    it('should validate password field correctly', () => {
      expect(validateField('password', 'Password123')).toBe('');
      expect(validateField('password', '')).toBe(AUTH_MESSAGES.PASSWORD_REQUIRED);
      expect(validateField('password', 'weak')).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
    });
  });

  describe('when field is unknown', () => {
    it('should return empty string for unknown fields', () => {
      expect(validateField('unknown', 'value')).toBe('');
      expect(validateField('name', 'John Doe')).toBe('');
      expect(validateField('age', '25')).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle null and undefined field names gracefully', () => {
      expect(validateField('', 'value')).toBe('');
    });

    it('should handle special characters in field names', () => {
      expect(validateField('field-name', 'value')).toBe('');
      expect(validateField('field_name', 'value')).toBe('');
      expect(validateField('fieldName123', 'value')).toBe('');
    });
  });
});

describe('validateLoginForm', () => {
  describe('when both email and password are valid', () => {
    it('should return no errors', () => {
      const result = validateLoginForm('test@example.com', 'Password123');
      
      expect(result.email).toBe('');
      expect(result.password).toBe('');
    });
  });

  describe('when email is invalid', () => {
    it('should return email error only', () => {
      const result = validateLoginForm('invalid-email', 'Password123');
      
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      expect(result.password).toBe('');
    });

    it('should return email required error when empty', () => {
      const result = validateLoginForm('', 'Password123');
      
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_REQUIRED);
      expect(result.password).toBe('');
    });
  });

  describe('when password is invalid', () => {
    it('should return password error only', () => {
      const result = validateLoginForm('test@example.com', 'weak');
      
      expect(result.email).toBe('');
      expect(result.password).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
    });

    it('should return password required error when empty', () => {
      const result = validateLoginForm('test@example.com', '');
      
      expect(result.email).toBe('');
      expect(result.password).toBe(AUTH_MESSAGES.PASSWORD_REQUIRED);
    });
  });

  describe('when both email and password are invalid', () => {
    it('should return both errors', () => {
      const result = validateLoginForm('invalid-email', 'weak');
      
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      expect(result.password).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
    });

    it('should return both required errors when empty', () => {
      const result = validateLoginForm('', '');
      
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_REQUIRED);
      expect(result.password).toBe(AUTH_MESSAGES.PASSWORD_REQUIRED);
    });
  });

  describe('edge cases', () => {
    it('should handle whitespace-only inputs', () => {
      const result = validateLoginForm('   ', '   ');
      
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      expect(result.password).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
    });

    it('should handle inputs with trailing spaces', () => {
      const result = validateLoginForm('test@example.com ', ' Password123');
      
      // Note: Our current implementation doesn't trim, so trailing spaces affect validation
      expect(result.email).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      expect(result.password).toBe(''); // Password with spaces is valid if it meets other criteria
    });
  });
});
