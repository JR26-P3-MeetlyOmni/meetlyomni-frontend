import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { createWrapper, mockUnauthenticatedState, mockErrorState } from '@/test-utils/test-utils';
import { AUTH_MESSAGES } from '../constants/messages';
import { useSignInForm } from './useSignInForm';

// Mock the validation functions
vi.mock('../validation/validators', () => ({
  validateField: vi.fn(),
  validateLoginForm: vi.fn(),
}));

// Mock the hooks that useSignInForm depends on
vi.mock('./useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('./useLogin', () => ({
  useLogin: vi.fn(),
}));

import { validateField, validateLoginForm } from '../validation/validators';
import { useAuth } from './useAuth';
import { useLogin } from './useLogin';

describe('useSignInForm', () => {
  const mockClearError = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: true,
      error: null,
      initializeAuth: vi.fn(),
      clearError: mockClearError,
    });

    vi.mocked(useLogin).mockReturnValue({
      login: mockLogin,
    });

    vi.mocked(validateField).mockReturnValue('');
    vi.mocked(validateLoginForm).mockReturnValue({ email: '', password: '' });
  });

  describe('initial state', () => {
    it('should return initial form state', () => {
      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockUnauthenticatedState }),
      });

      expect(result.current.formData).toEqual({ email: '', password: '' });
      expect(result.current.errors).toEqual({ email: '', password: '', auth: null });
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.hasSubmitted).toBe(false);
    });

    it('should include auth error in errors object', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: 'Login failed. Please check your email and password.',
        initializeAuth: vi.fn(),
        clearError: mockClearError,
      });

      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockErrorState }),
      });

      expect(result.current.errors.auth).toBe('Login failed. Please check your email and password.');
    });
  });

  describe('handleInputChange', () => {
    it('should update form data when input changes', () => {
      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockUnauthenticatedState }),
      });

      act(() => {
        result.current.handleInputChange('email', 'test@example.com');
      });

      expect(result.current.formData.email).toBe('test@example.com');
      expect(result.current.formData.password).toBe('');
    });
  });

  describe('handleInputBlur', () => {
    it('should validate field on blur and set error', () => {
      vi.mocked(validateField).mockReturnValue(AUTH_MESSAGES.EMAIL_INVALID);

      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockUnauthenticatedState }),
      });

      act(() => {
        result.current.handleInputBlur('email', 'invalid-email');
      });

      expect(validateField).toHaveBeenCalledWith('email', 'invalid-email');
    });
  });

  describe('handleSubmit', () => {
    it('should validate form and call login when form is valid', async () => {
      vi.mocked(validateLoginForm).mockReturnValue({ email: '', password: '' });
      mockLogin.mockResolvedValue(true);

      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockUnauthenticatedState }),
      });

      // Set form data first
      act(() => {
        result.current.handleInputChange('email', 'test@example.com');
        result.current.handleInputChange('password', 'Password123');
      });

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(result.current.hasSubmitted).toBe(true);
      expect(validateLoginForm).toHaveBeenCalledWith('test@example.com', 'Password123');
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123',
      });
    });

    it('should not call login when form has validation errors', async () => {
      vi.mocked(validateLoginForm).mockReturnValue({
        email: AUTH_MESSAGES.EMAIL_INVALID,
        password: AUTH_MESSAGES.PASSWORD_INVALID,
      });

      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: mockUnauthenticatedState }),
      });

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(result.current.hasSubmitted).toBe(true);
      expect(result.current.errors.email).toBe(AUTH_MESSAGES.EMAIL_INVALID);
      expect(result.current.errors.password).toBe(AUTH_MESSAGES.PASSWORD_INVALID);
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  describe('loading states', () => {
    it('should return isSubmitting true when auth is loading', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
        isInitialized: true,
        error: null,
        initializeAuth: vi.fn(),
        clearError: mockClearError,
      });

      const { result } = renderHook(() => useSignInForm(), {
        wrapper: createWrapper({ auth: { ...mockUnauthenticatedState, isLoading: true } }),
      });

      expect(result.current.isSubmitting).toBe(true);
    });
  });
});