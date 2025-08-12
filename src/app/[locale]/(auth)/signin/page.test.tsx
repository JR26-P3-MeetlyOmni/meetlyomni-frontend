import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SigninPage from './page';

// Simple mock for Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock Material-UI components to avoid complex rendering issues
vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  TextField: ({ label, ...props }: any) => (
    <input aria-label={label} {...props} />
  ),
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  Typography: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  Link: ({ children, ...props }: any) => (
    <a {...props}>{children}</a>
  ),
  Container: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  Paper: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  IconButton: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  InputAdornment: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock('@mui/icons-material', () => ({
  Visibility: () => <span>Visibility</span>,
  VisibilityOff: () => <span>VisibilityOff</span>,
}));

describe('SigninPage', () => {
  it('renders the sign-in form with title', () => {
    render(<SigninPage />);
    
    // Check for title
    expect(screen.getByText("Welcome to Omni! Let's Sign in Your Profile")).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<SigninPage />);
    
    // Check for form elements
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
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
