import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SigninPage from './page';

// Simple mock for Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// Mock Material-UI components to avoid complex rendering issues
const filterDomProps = (props: any) => {
  // 过滤掉非标准 DOM 属性
  const { fullWidth, maxWidth, error, ...rest } = props;
  return rest;
};
vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  TextField: ({ label, ...props }: any) => <input aria-label={label} {...filterDomProps(props)} />,
  Button: ({ children, ...props }: any) => <button {...filterDomProps(props)}>{children}</button>,
  Typography: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  Link: ({ children, ...props }: any) => <a {...filterDomProps(props)}>{children}</a>,
  Container: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  Paper: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  IconButton: ({ children, ...props }: any) => (
    <button {...filterDomProps(props)}>{children}</button>
  ),
  InputAdornment: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
  useTheme: () => ({
    palette: { mode: 'light' },
    spacing: (factor = 1) => `${8 * factor}px`, // MUI 默认 spacing
    // 可根据需要添加更多 theme 属性
  }),
}));

vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span>Visibility</span>,
  VisibilityOff: () => <span>VisibilityOff</span>,
}));

describe('SigninPage', () => {
  it('renders the sign-in form with title', () => {
    render(<SigninPage />);

    // 分别检查标题的两部分
    expect(screen.getByText('Welcome to Omni!')).toBeInTheDocument();
    expect(screen.getByText("Let's Sign in Your Profile")).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<SigninPage />);

    // 用 placeholder 检查 input
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    render(<SigninPage />);

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders forgot password and sign up links', () => {
    render(<SigninPage />);

    // Check for links
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
