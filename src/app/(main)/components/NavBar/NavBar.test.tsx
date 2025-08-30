import { beforeEach, describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test('render logo, nav links, and buttons when not logged in', () => {
    render(<NavBar />);

    const logo = screen.getByAltText('Omni Logo');
    expect(logo).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    const signInButton = screen.getByText('Sign In');
    const getStartedButton = screen.getByText('Get Started');
    expect(signInButton).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });

  test('navigates to signup page when Get Started button is clicked', () => {
    render(<NavBar />);

    const getStartedButton = screen.getByText('Get Started');
    fireEvent.click(getStartedButton);

    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  test('shows user menu when logged in', () => {
    render(<NavBar />);

    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    // After clicking Sign In, the user should be logged in
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();

    // User menu should be visible
    expect(screen.getByText('Alex Li')).toBeInTheDocument();
  });
});
