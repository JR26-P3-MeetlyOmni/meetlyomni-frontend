import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ResetPasswordForm from './ResetPasswordForm';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock the resetPasswordThunk
vi.mock('@/features/auth/authThunks', () => ({
  resetPasswordThunk: vi.fn(),
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

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it('shows error when password length < 8', () => {
    render(<ResetPasswordForm token="dummy" email="test@example.com" />, { wrapper: Wrapper });

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
    render(<ResetPasswordForm token="dummy" email="test@example.com" />, { wrapper: Wrapper });

    const newPw = screen.getByLabelText('New Password', { selector: 'input', exact: true });
    const confirmPw = screen.getByLabelText('Confirm Password', { selector: 'input', exact: true });
    const submit = screen.getByRole('button', { name: /set new password/i });

    fireEvent.change(newPw, { target: { value: 'abcd1234' } });
    fireEvent.change(confirmPw, { target: { value: 'abcd9999' } });
    fireEvent.click(submit);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('accepts valid password inputs', () => {
    render(<ResetPasswordForm token="dummy" email="test@example.com" />, { wrapper: Wrapper });

    const newPw = screen.getByLabelText('New Password', { selector: 'input', exact: true });
    const confirmPw = screen.getByLabelText('Confirm Password', { selector: 'input', exact: true });
    const submit = screen.getByRole('button', { name: /set new password/i });

    fireEvent.change(newPw, { target: { value: 'abcd1234' } });
    fireEvent.change(confirmPw, { target: { value: 'abcd1234' } });

    // Check that valid passwords are accepted
    expect(newPw).toHaveValue('abcd1234');
    expect(confirmPw).toHaveValue('abcd1234');
    expect(submit).not.toBeDisabled();
  });
});
