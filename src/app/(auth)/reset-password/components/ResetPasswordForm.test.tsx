import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import ResetPasswordForm from './ResetPasswordForm';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

const theme = createTheme();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ResetPasswordForm', () => {
  beforeEach(() => pushMock.mockReset());

  it('shows error when password length < 8', () => {
    render(<ResetPasswordForm token="dummy" />, { wrapper: Wrapper });

    // 用 label + selector 精确到 input，避免命中按钮的 aria-label
    const newPw = screen.getByLabelText('New Password', { selector: 'input', exact: true });
    const confirmPw = screen.getByLabelText('Confirm Password', { selector: 'input', exact: true });
    const submit = screen.getByRole('button', { name: /set new password/i });

    fireEvent.change(newPw, { target: { value: '1234567' } });
    fireEvent.change(confirmPw, { target: { value: '1234567' } });
    fireEvent.click(submit);

    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('shows error when passwords do not match', () => {
    render(<ResetPasswordForm token="dummy" />, { wrapper: Wrapper });

    const newPw = screen.getByLabelText('New Password', { selector: 'input', exact: true });
    const confirmPw = screen.getByLabelText('Confirm Password', { selector: 'input', exact: true });
    const submit = screen.getByRole('button', { name: /set new password/i });

    fireEvent.change(newPw, { target: { value: 'abcd1234' } });
    fireEvent.change(confirmPw, { target: { value: 'abcd9999' } });
    fireEvent.click(submit);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('pushes to /reset-password/success with valid inputs', async () => {
    vi.useFakeTimers();
    render(<ResetPasswordForm token="dummy" />, { wrapper: Wrapper });

    const newPw = screen.getByLabelText('New Password', { selector: 'input', exact: true });
    const confirmPw = screen.getByLabelText('Confirm Password', { selector: 'input', exact: true });
    const submit = screen.getByRole('button', { name: /set new password/i });

    fireEvent.change(newPw, { target: { value: 'abcd1234' } });
    fireEvent.change(confirmPw, { target: { value: 'abcd1234' } });
    fireEvent.click(submit);

    await act(async () => {
      vi.advanceTimersByTime(300); // 组件里 setTimeout(300)
    });

    expect(pushMock).toHaveBeenCalledWith('/reset-password/success');
    vi.useRealTimers();
  });
});
