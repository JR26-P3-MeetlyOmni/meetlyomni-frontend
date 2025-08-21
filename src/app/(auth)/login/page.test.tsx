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
  // filter out non-standard DOM props
  const { fullWidth, maxWidth, error, ...rest } = props;
  return rest;
};

vi.mock('@mui/material', () => {
  // Mock styled function
  const styled = (component: any) => (styles: any) => {
    return ({ children, ...props }: any) => {
      const Component = component;
      return <Component {...filterDomProps(props)}>{children}</Component>;
    };
  };

  return {
    Box: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    TextField: ({ label, ...props }: any) => (
      <input aria-label={label} {...filterDomProps(props)} />
    ),
    Button: ({ children, ...props }: any) => <button {...filterDomProps(props)}>{children}</button>,
    Typography: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Link: ({ children, ...props }: any) => <a {...filterDomProps(props)}>{children}</a>,
    Container: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    Paper: ({ children, ...props }: any) => <div {...filterDomProps(props)}>{children}</div>,
    IconButton: ({ children, ...props }: any) => (
      <button {...filterDomProps(props)}>{children}</button>
    ),
    InputAdornment: ({ children, ...props }: any) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
    useTheme: () => ({
      palette: { mode: 'light' },
      spacing: (factor = 1) => `${8 * factor}px`, // MUI 默认 spacing
      breakpoints: {
        up: (breakpoint: string) => `@media (min-width: ${breakpoint})`,
      },
      // can add more theme props as needed
    }),
    styled,
  };
});

vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span>Visibility</span>,
  VisibilityOff: () => <span>VisibilityOff</span>,
}));

describe('SigninPage', () => {
  it('renders the sign-in form with title', () => {
    render(<SigninPage />);

    // check both parts of the title
    expect(screen.getByText('Welcome to Omni!')).toBeInTheDocument();
    expect(screen.getByText("Let's Sign in Your Profile")).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<SigninPage />);

    // check with input with placeholder
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
