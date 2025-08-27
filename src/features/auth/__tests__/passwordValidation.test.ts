import { describe, expect, it } from 'vitest';

import {
  validatePasswordStrength,
  isPasswordValid,
  getPasswordStrengthScore,
  getPasswordStrengthMeta,
  getPasswordValidationState,
} from '../utils/passwordValidation';

describe('passwordValidation', () => {
  describe('validatePasswordStrength', () => {
    it('should validate password with all requirements met', () => {
      const password = 'StrongPass123!';
      const result = validatePasswordStrength(password);

      expect(result).toEqual({
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: true,
        hasSpecial: true,
        match: true,
      });
    });

    it('should validate password with missing requirements', () => {
      const password = 'weak';
      const result = validatePasswordStrength(password);

      expect(result).toEqual({
        minLength: false,
        hasUpper: false,
        hasLower: true,
        hasNumber: false,
        hasSpecial: false,
        match: true,
      });
    });

    it('should validate password with confirm password match', () => {
      const password = 'StrongPass123!';
      const confirmPassword = 'StrongPass123!';
      const result = validatePasswordStrength(password, confirmPassword);

      expect(result.match).toBe(true);
    });

    it('should validate password with confirm password mismatch', () => {
      const password = 'StrongPass123!';
      const confirmPassword = 'DifferentPass123!';
      const result = validatePasswordStrength(password, confirmPassword);

      expect(result.match).toBe(false);
    });

    it('should handle empty confirm password', () => {
      const password = 'StrongPass123!';
      const confirmPassword = '';
      const result = validatePasswordStrength(password, confirmPassword);

      expect(result.match).toBe(false);
    });

    it('should handle undefined confirm password', () => {
      const password = 'StrongPass123!';
      const result = validatePasswordStrength(password);

      expect(result.match).toBe(true);
    });

    it('should validate edge cases', () => {
      // Empty password
      expect(validatePasswordStrength('')).toEqual({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
        match: true,
      });

      // Only numbers
      expect(validatePasswordStrength('123456789012')).toEqual({
        minLength: true,
        hasUpper: false,
        hasLower: false,
        hasNumber: true,
        hasSpecial: false,
        match: true,
      });

      // Only special characters
      expect(validatePasswordStrength('!@#$%^&*()_+')).toEqual({
        minLength: true,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: true,
        match: true,
      });
    });
  });

  describe('isPasswordValid', () => {
    it('should return true for valid password', () => {
      const validation = {
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: true,
        hasSpecial: true,
        match: true,
      };

      expect(isPasswordValid(validation)).toBe(true);
    });

    it('should return false for invalid password', () => {
      const validation = {
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: false,
        hasSpecial: true,
        match: true,
      };

      expect(isPasswordValid(validation)).toBe(false);
    });

    it('should return false when passwords do not match', () => {
      const validation = {
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: true,
        hasSpecial: true,
        match: false,
      };

      expect(isPasswordValid(validation)).toBe(false);
    });
  });

  describe('getPasswordStrengthScore', () => {
    it('should return 0 for weak password', () => {
      const validation = {
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
        match: true,
      };

      expect(getPasswordStrengthScore(validation)).toBe(0);
    });

    it('should return 5 for strong password', () => {
      const validation = {
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: true,
        hasSpecial: true,
        match: true,
      };

      expect(getPasswordStrengthScore(validation)).toBe(5);
    });

    it('should return 3 for medium password', () => {
      const validation = {
        minLength: true,
        hasUpper: true,
        hasLower: true,
        hasNumber: false,
        hasSpecial: false,
        match: true,
      };

      expect(getPasswordStrengthScore(validation)).toBe(3);
    });
  });

  describe('getPasswordStrengthMeta', () => {
    it('should return weak for score 0-2', () => {
      expect(getPasswordStrengthMeta(0)).toEqual({ label: 'Weak', color: 'error' });
      expect(getPasswordStrengthMeta(1)).toEqual({ label: 'Weak', color: 'error' });
      expect(getPasswordStrengthMeta(2)).toEqual({ label: 'Weak', color: 'error' });
    });

    it('should return medium for score 3-4', () => {
      expect(getPasswordStrengthMeta(3)).toEqual({ label: 'Medium', color: 'warning' });
      expect(getPasswordStrengthMeta(4)).toEqual({ label: 'Medium', color: 'warning' });
    });

    it('should return strong for score 5', () => {
      expect(getPasswordStrengthMeta(5)).toEqual({ label: 'Strong', color: 'success' });
    });
  });

  describe('getPasswordValidationState', () => {
    it('should return complete validation state for strong password', () => {
      const password = 'StrongPass123!';
      const confirmPassword = 'StrongPass123!';
      const result = getPasswordValidationState(password, confirmPassword);

      expect(result).toEqual({
        validation: {
          minLength: true,
          hasUpper: true,
          hasLower: true,
          hasNumber: true,
          hasSpecial: true,
          match: true,
        },
        isValidPassword: true,
        isLengthOk: true,
        isCaseOk: true,
        isNumSpecialOk: true,
        isStrong: true,
        hasInput: true,
        strengthScore: 5,
        strengthPercent: 100,
        strengthMeta: { label: 'Strong', color: 'success' },
      });
    });

    it('should return complete validation state for weak password', () => {
      const password = 'weak';
      const confirmPassword = 'weak';
      const result = getPasswordValidationState(password, confirmPassword);

      expect(result).toEqual({
        validation: {
          minLength: false,
          hasUpper: false,
          hasLower: true,
          hasNumber: false,
          hasSpecial: false,
          match: true,
        },
        isValidPassword: false,
        isLengthOk: false,
        isCaseOk: false,
        isNumSpecialOk: false,
        isStrong: false,
        hasInput: true,
        strengthScore: 1,
        strengthPercent: 20,
        strengthMeta: { label: 'Weak', color: 'error' },
      });
    });

    it('should handle empty password', () => {
      const password = '';
      const confirmPassword = '';
      const result = getPasswordValidationState(password, confirmPassword);

      expect(result.hasInput).toBe(false);
      expect(result.isValidPassword).toBe(false);
      expect(result.strengthScore).toBe(0);
      expect(result.strengthPercent).toBe(0);
    });

    it('should handle password mismatch', () => {
      const password = 'StrongPass123!';
      const confirmPassword = 'DifferentPass123!';
      const result = getPasswordValidationState(password, confirmPassword);

      expect(result.validation.match).toBe(false);
      expect(result.isValidPassword).toBe(false);
    });
  });
});
