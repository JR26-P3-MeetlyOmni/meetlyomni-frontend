import { describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
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

  test('navigates to login page when Sign In button is clicked', () => {
    render(<NavBar />);

    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
