import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import RequestResetEmailForm from './RequestResetEmailForm';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock the forgotPasswordThunk
vi.mock('@/features/auth/authThunks', () => ({
  forgotPasswordThunk: vi.fn(),
}));

(globalThis as any).React = React;

const theme = createTheme();

// Create a mock store
const mockStore = configureStore({
  reducer: {
    auth: (
      state = { user: null, isLoading: false, error: null, initialized: true, expiresAt: null },
    ) => state,
  },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

describe('RequestResetEmailForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

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

  it('accepts valid email input', () => {
    render(<RequestResetEmailForm />, { wrapper: Wrapper });

    const emailInput = screen.getByLabelText(/^email$/i, { selector: 'input', exact: false });
    const sendBtn = screen.getByRole('button', { name: /send reset email/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Check that valid email is accepted
    expect(emailInput).toHaveValue('test@example.com');
    expect(sendBtn).not.toBeDisabled();
  });
});
