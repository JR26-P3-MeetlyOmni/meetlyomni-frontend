// src/features/auth/components/ContactInfoStep/ContactInfoStep.hook.test.ts
import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { act, renderHook } from '@testing-library/react';

import { type NextPayload, useContactInfoForm } from './ContactInfoStep.hook';

const changeEvent = (value: string) =>
  ({ target: { value } }) as unknown as React.ChangeEvent<HTMLInputElement>;

describe('useContactInfoForm', () => {
  it('returns invalid state initially', () => {
    const onNext = vi.fn<(p: NextPayload) => void>();
    const onBack = vi.fn();
    const { result } = renderHook(() => useContactInfoForm(onNext, onBack));
    expect(result.current.isFormValid).toBe(false);
  });

  it('validates name and local phone and calls onNext with E.164', () => {
    const onNext = vi.fn<(p: NextPayload) => void>();
    const onBack = vi.fn();
    const { result } = renderHook(() => useContactInfoForm(onNext, onBack));

    act(() => {
      result.current.handleNameChange(changeEvent('Alex'));
      result.current.handlePhoneChange(changeEvent('0412345678'));
    });

    expect(result.current.isFormValid).toBe(true);

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => undefined,
      } as unknown as React.FormEvent);
    });

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledWith({ name: 'Alex', phone: '+61412345678' });
  });

  it('accepts pasted +61 and normalizes to local part', () => {
    const onNext = vi.fn<(p: NextPayload) => void>();
    const onBack = vi.fn();
    const { result } = renderHook(() => useContactInfoForm(onNext, onBack));

    act(() => {
      result.current.handleNameChange(changeEvent('Alex'));
      result.current.handlePhoneChange(changeEvent('+61 412 345 678'));
    });

    expect(result.current.phone).toBe('412345678');
    expect(result.current.isFormValid).toBe(true);
  });

  it('keeps Next disabled for invalid phone', () => {
    const onNext = vi.fn<(p: NextPayload) => void>();
    const onBack = vi.fn();
    const { result } = renderHook(() => useContactInfoForm(onNext, onBack));

    act(() => {
      result.current.handleNameChange(changeEvent('Alex'));
      result.current.handlePhoneChange(changeEvent('123'));
    });

    expect(result.current.isFormValid).toBe(false);
  });
});
