import { beforeEach, describe, expect, it, vi } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useLoginForm } from './useLoginForm';

// Mock the auth service
vi.mock('@/services/authService', () => ({
  login: vi.fn(),
  AuthServiceError: class AuthServiceError extends Error {
    constructor(message: string, type: string) {
      super(message);
      this.name = 'AuthServiceError';
    }
  },
}));

describe('useLoginForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.loginState).toEqual({
      status: 'idle',
      error: null,
    });
  });

  it('should handle input changes correctly', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      const emailChangeEvent = {
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange('email')(emailChangeEvent);
    });

    expect(result.current.formData.email).toBe('test@example.com');
  });

  it('should clear field errors when input changes', () => {
    const { result } = renderHook(() => useLoginForm());

    // First, set an error
    act(() => {
      result.current.formData.email = '';
      result.current.errors.email = 'Email is required';
    });

    // Then change the input
    act(() => {
      const emailChangeEvent = {
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange('email')(emailChangeEvent);
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('should validate email format correctly', async () => {
    const { result } = renderHook(() => useLoginForm());

    // Test invalid email
    act(() => {
      const emailChangeEvent = {
        target: { value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange('email')(emailChangeEvent);
    });

    await act(async () => {
      const formEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;

      await result.current.handleSubmit(formEvent);
    });

    expect(result.current.errors.email).toBe('Please enter a valid email');
  });

  it('should validate password length correctly', async () => {
    const { result } = renderHook(() => useLoginForm());

    // Test short password
    act(() => {
      const passwordChangeEvent = {
        target: { value: '123' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange('password')(passwordChangeEvent);
    });

    await act(async () => {
      const formEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;

      await result.current.handleSubmit(formEvent);
    });

    expect(result.current.errors.password).toBe('Password must be at least 6 characters');
  });

  it('should require email field', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      const formEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;

      await result.current.handleSubmit(formEvent);
    });

    expect(result.current.errors.email).toBe('Email is required');
  });

  it('should require password field', async () => {
    const { result } = renderHook(() => useLoginForm());

    // Set email but leave password empty
    act(() => {
      const emailChangeEvent = {
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>;

      result.current.handleInputChange('email')(emailChangeEvent);
    });

    await act(async () => {
      const formEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>;

      await result.current.handleSubmit(formEvent);
    });

    expect(result.current.errors.password).toBe('Password is required');
  });

  it('should return all required methods and properties', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current).toHaveProperty('formData');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('loginState');
    expect(result.current).toHaveProperty('handleInputChange');
    expect(result.current).toHaveProperty('handleSubmit');

    expect(typeof result.current.handleInputChange).toBe('function');
    expect(typeof result.current.handleSubmit).toBe('function');
  });
});
