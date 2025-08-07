import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import type { LoginFormHook } from '../types';
import { MessageAlert } from './MessageAlert';

describe('MessageAlert Component', () => {
  it('should not render anything when no error or success state', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'idle',
      error: null,
    };

    const { container } = render(<MessageAlert loginState={loginState} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render error message when login fails', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'error',
      error: 'Invalid credentials',
    };

    render(<MessageAlert loginState={loginState} />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('aria-label', 'error');
  });

  it('should render success message when login succeeds', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'success',
      error: null,
    };

    render(<MessageAlert loginState={loginState} />);

    expect(screen.getByText(/登录成功！正在跳转/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('aria-label', 'success');
  });

  it('should render error message with different error text', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'error',
      error: 'Network connection failed',
    };

    render(<MessageAlert loginState={loginState} />);

    expect(screen.getByText('Network connection failed')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes for error alert', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'error',
      error: 'Test error',
    };

    render(<MessageAlert loginState={loginState} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-label', 'error');
  });

  it('should have correct accessibility attributes for success alert', () => {
    const loginState: LoginFormHook['loginState'] = {
      status: 'success',
      error: null,
    };

    render(<MessageAlert loginState={loginState} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-label', 'success');
  });
});
