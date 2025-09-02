import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';

import { useNewPasswordForm } from '../hooks/useNewPasswordForm';
import authReducer from '../slice';
import { resetPasswordThunk } from '../thunks/resetPasswordThunk';
// Import mocked functions
import { validatePasswordStrength } from '../utils/passwordValidation';

// Mock the thunk
vi.mock('../thunks/resetPasswordThunk', () => ({
  resetPasswordThunk: Object.assign(
    vi.fn().mockImplementation(() => Promise.resolve()),
    {
      pending: { type: 'auth/resetPasswordThunk/pending' },
      fulfilled: { type: 'auth/resetPasswordThunk/fulfilled' },
      rejected: { type: 'auth/resetPasswordThunk/rejected' },
    },
  ),
}));

// Mock the validation function
vi.mock('../utils/passwordValidation', () => ({
  validatePasswordStrength: vi.fn(),
}));

const mockValidatePasswordStrength = validatePasswordStrength as ReturnType<typeof vi.fn>;
const mockResetPasswordThunk = resetPasswordThunk as ReturnType<typeof vi.fn>;

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

// Create a test wrapper component
const createTestWrapper = (store: ReturnType<typeof configureStore>) => {
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(Provider, { store }, children);
  };
};

describe('useNewPasswordForm', () => {
  let store: ReturnType<typeof configureStore>;
  const testToken = 'test-token-123';

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    mockResetPasswordThunk.mockClear();
    mockValidatePasswordStrength.mockClear();

    // Reset window.location
    window.location.href = '';

    // Mock timer
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default values', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.password).toBe('');
    expect(result.current.confirmPassword).toBe('');
    expect(result.current.showPassword).toBe(false);
    expect(result.current.showConfirmPassword).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.resetError).toBe(null);
    expect(result.current.isValidPassword).toBe(false);
    expect(result.current.showValidation).toBe(false);
  });

  it('should handle password change', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    act(() => {
      result.current.setPassword('newpassword');
    });

    expect(result.current.password).toBe('newpassword');
  });

  it('should handle confirm password change', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    act(() => {
      result.current.setConfirmPassword('confirmpassword');
    });

    expect(result.current.confirmPassword).toBe('confirmpassword');
  });

  it('should toggle password visibility', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.showPassword).toBe(false);

    act(() => {
      result.current.toggleShowPassword();
    });

    expect(result.current.showPassword).toBe(true);

    act(() => {
      result.current.toggleShowPassword();
    });

    expect(result.current.showPassword).toBe(false);
  });

  it('should toggle confirm password visibility', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.showConfirmPassword).toBe(false);

    act(() => {
      result.current.toggleShowConfirmPassword();
    });

    expect(result.current.showConfirmPassword).toBe(true);

    act(() => {
      result.current.toggleShowConfirmPassword();
    });

    expect(result.current.showConfirmPassword).toBe(false);
  });

  it('should validate password strength correctly', () => {
    const mockValidation = {
      minLength: true,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      match: true,
    };

    mockValidatePasswordStrength.mockReturnValue(mockValidation);

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.validation).toEqual(mockValidation);
    expect(result.current.isValidPassword).toBe(true);
  });

  it('should show validation errors when password is invalid', () => {
    const mockValidation = {
      minLength: false,
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    };

    mockValidatePasswordStrength.mockReturnValue(mockValidation);

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.isValidPassword).toBe(false);
  });

  it('should not submit form when password is invalid', async () => {
    const mockValidation = {
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    };

    mockValidatePasswordStrength.mockReturnValue(mockValidation);

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    act(() => {
      result.current.setPassword('weak');
      result.current.setConfirmPassword('weak');
    });

    const mockPreventDefault = vi.fn();
    const mockEvent = { preventDefault: mockPreventDefault };

    act(() => {
      result.current.handleSubmit(mockEvent as any);
    });

    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockResetPasswordThunk).not.toHaveBeenCalled();
    expect(result.current.showValidation).toBe(true);
  });

  it('should call validatePasswordStrength with correct parameters', () => {
    mockValidatePasswordStrength.mockReturnValue({
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      match: false,
    });

    const { result } = renderHook(() => useNewPasswordForm(testToken), {
      wrapper: createTestWrapper(store),
    });

    act(() => {
      result.current.setPassword('password123');
      result.current.setConfirmPassword('password123');
    });

    expect(mockValidatePasswordStrength).toHaveBeenCalledWith('password123', 'password123');
  });
});
