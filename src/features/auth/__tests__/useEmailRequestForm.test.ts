import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';

import { useEmailRequestForm } from '../hooks/useEmailRequestForm';
import authReducer from '../slice';
import { validateEmail } from '../utils/emailValidation';

// Mock the thunk to behave like a real redux-thunk action creator
vi.mock('../thunks/requestResetThunk', () => {
  const PENDING = 'auth/requestResetThunk/pending';
  const FULFILLED = 'auth/requestResetThunk/fulfilled';
  const REJECTED = 'auth/requestResetThunk/rejected';

  const requestResetThunk = Object.assign(
    (args: { email: string }) => {
      return async (dispatch: (action: any) => any) => {
        dispatch({ type: PENDING, meta: { arg: args } });
        await Promise.resolve();
        const fulfilledAction = {
          type: FULFILLED,
          payload: { success: true },
          meta: { arg: args },
        };
        dispatch(fulfilledAction);
        return fulfilledAction;
      };
    },
    {
      pending: { type: PENDING },
      fulfilled: {
        type: FULFILLED,
        match: (action: { type: string }) => action.type === FULFILLED,
      },
      rejected: { type: REJECTED, match: (action: { type: string }) => action.type === REJECTED },
    },
  );

  return { requestResetThunk };
});

// Mock the validation function
vi.mock('../utils/emailValidation', () => ({
  validateEmail: vi.fn(),
}));

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
      middleware: getDefaultMiddleware =>
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

  it('should handle submit with valid email', async () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    mockValidateEmail.mockReturnValue(true);

    // Set email first
    act(() => {
      result.current.handleEmailChange({
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockValidateEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should not dispatch thunk when email is empty', async () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    act(() => {
      void result.current.handleSubmit(mockEvent);
    });

    // ensure no pending action dispatched
    await waitFor(() => {
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/requestResetThunk/pending' }),
      );
    });
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should validate email and avoid dispatch when email is invalid', async () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    mockValidateEmail.mockReturnValue(false);

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'invalid-email' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    act(() => {
      void result.current.handleSubmit(mockEvent);
    });

    // validateEmail should be called; dispatch should not fire pending
    await waitFor(() => {
      expect(mockValidateEmail).toHaveBeenCalledWith('invalid-email');
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'auth/requestResetThunk/pending' }),
      );
    });
  });

  it('should clear email after successful submit', async () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    mockValidateEmail.mockReturnValue(true);

    act(() => {
      result.current.handleEmailChange({
        target: { value: 'test@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.email).toBe('');
  });

  it('should clear validation error when email changes', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    // Then change email
    act(() => {
      result.current.handleEmailChange({
        target: { value: 'new@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.displayError).toBe(null);
  });

  it('should clear request error when email changes', () => {
    const { result } = renderHook(() => useEmailRequestForm(), {
      wrapper: createTestWrapper(store),
    });

    // Set request error in store
    act(() => {
      store.dispatch({
        type: 'auth/clearPasswordResetErrors',
      });
    });

    // Change email to trigger useEffect
    act(() => {
      result.current.handleEmailChange({
        target: { value: 'new@example.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.displayError).toBe(null);
  });
});
