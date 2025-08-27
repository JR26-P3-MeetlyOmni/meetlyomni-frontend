import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import authReducer from '../slice';
import { useEmailRequestForm } from '../hooks/useEmailRequestForm';

// Mock the thunk
vi.mock('../thunks/requestResetThunk', () => ({
  requestResetThunk: Object.assign(vi.fn().mockImplementation(() => Promise.resolve()), {
    pending: { type: 'auth/requestResetThunk/pending' },
    fulfilled: { type: 'auth/requestResetThunk/fulfilled' },
    rejected: { type: 'auth/requestResetThunk/rejected' },
  }),
}));

// Mock the validation function
vi.mock('../utils/emailValidation', () => ({
  validateEmail: vi.fn(),
}));

import { validateEmail } from '../utils/emailValidation';
const mockValidateEmail = validateEmail as ReturnType<typeof vi.fn>;

// Create a test wrapper component
const createTestWrapper = (store: ReturnType<typeof configureStore>) => {
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(Provider, { store }, children);
  };
};

describe('useEmailRequestForm', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    mockValidateEmail.mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    expect(result.current.email).toBe('');
    expect(result.current.emailSent).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.displayError).toBe(null);
  });

  it('should handle email change', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    const mockEvent = {
      target: { value: 'test@example.com' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleEmailChange(mockEvent);
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('should reflect loading state from store', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    // Set loading state in store
    act(() => {
      store.dispatch({
        type: 'auth/requestResetThunk/pending',
      });
    });

    expect(result.current.isSubmitting).toBe(true);
  });

  it('should reflect email sent state from store', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    // Set email sent state in store
    act(() => {
      store.dispatch({
        type: 'auth/requestResetThunk/fulfilled',
      });
    });

    expect(result.current.emailSent).toBe(true);
  });


});

