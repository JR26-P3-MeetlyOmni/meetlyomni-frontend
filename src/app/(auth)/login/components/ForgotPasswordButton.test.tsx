import { describe, expect, it } from 'vitest';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ForgotPasswordButton from './ForgotPasswordButton';

// 让 React 在全局，避免某些打包器/类型提示问题
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

const theme = createTheme();
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ForgotPasswordButton', () => {
  it('renders a link/button with correct accessible name', () => {
    render(<ForgotPasswordButton />, { wrapper: Wrapper });

    // MUI Button with NextLink 会渲染成 <a>，用 role=link 更稳妥
    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toBeInTheDocument();
  });

  it('navigates to /forgot-password (href)', () => {
    render(<ForgotPasswordButton />, { wrapper: Wrapper });

    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toHaveAttribute('href', '/forgot-password');
  });
});
