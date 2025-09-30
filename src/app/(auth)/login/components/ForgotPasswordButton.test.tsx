import { describe, expect, it } from 'vitest';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ForgotPasswordButton from './ForgotPasswordButton';


(globalThis as any).React = React;

const theme = createTheme();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ForgotPasswordButton', () => {
  it('renders a link/button with correct accessible name', () => {
    render(<ForgotPasswordButton />, { wrapper: Wrapper });


    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toBeInTheDocument();
  });

  it('navigates to /forgot-password (href)', () => {
    render(<ForgotPasswordButton />, { wrapper: Wrapper });

    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toHaveAttribute('href', '/forgot-password');
  });
});
