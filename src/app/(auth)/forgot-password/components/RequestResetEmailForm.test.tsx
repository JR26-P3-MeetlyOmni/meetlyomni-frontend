import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import RequestResetEmailForm from './RequestResetEmailForm';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

(globalThis as any).React = React;

const theme = createTheme();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('RequestResetEmailForm', () => {
  beforeEach(() => pushMock.mockReset());

  it('shows error for invalid email', () => {
    render(<RequestResetEmailForm />, { wrapper: Wrapper });

    const emailInput = screen.getByLabelText(/^email$/i, { selector: 'input', exact: false });

    const sendBtn = screen.getByRole('button', { name: /send reset email/i });

    fireEvent.change(emailInput, { target: { value: 'abc' } });
    fireEvent.click(sendBtn);

    expect(
      screen.getByText(/invalid email format|please enter a valid email address/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/^email$/i, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );

    expect(pushMock).not.toHaveBeenCalled();
  });

  it('navigates to /forgot-password/sent on valid email submit', () => {
    render(<RequestResetEmailForm />, { wrapper: Wrapper });

    const emailInput = screen.getByLabelText(/^email$/i, { selector: 'input', exact: false });
    const sendBtn = screen.getByRole('button', { name: /send reset email/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendBtn);

    expect(pushMock).toHaveBeenCalledWith('/forgot-password/sent');
  });
});
