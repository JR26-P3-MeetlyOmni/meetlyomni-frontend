// src/features/auth/components/ContactInfoStep/ContactInfoStep.test.tsx
import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ContactInfoStep from './ContactInfoStep';

const type = (el: HTMLElement, value: string) => {
  fireEvent.change(el, { target: { value } });
  fireEvent.blur(el);
};

describe('ContactInfoStep', () => {
  it('disables Next until fields are valid', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<ContactInfoStep onNext={onNext} onBack={onBack} />);

    const nextBtn = screen.getByRole('button', { name: /next/i }) as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);

    const nameInput = screen.getByLabelText(/contact name:/i);
    const phoneInput = screen.getByLabelText(/phone:/i);

    type(nameInput, 'Alex');
    type(phoneInput, '123');

    expect(nextBtn.disabled).toBe(true);

    type(phoneInput, '0412345678');

    expect(nextBtn.disabled).toBe(false);
  });

  it('calls onNext with normalized phone', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<ContactInfoStep onNext={onNext} onBack={onBack} />);

    const nameInput = screen.getByLabelText(/contact name:/i);
    const phoneInput = screen.getByLabelText(/phone:/i);
    const nextBtn = screen.getByRole('button', { name: /next/i }) as HTMLButtonElement;

    type(nameInput, 'Alex');
    type(phoneInput, '+61 412 345 678');

    const form = nextBtn.closest('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledWith({ name: 'Alex', phone: '+61412345678' });
  });

  it('calls onBack when Back is clicked', () => {
    const onNext = vi.fn();
    const onBack = vi.fn();
    render(<ContactInfoStep onNext={onNext} onBack={onBack} />);

    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
