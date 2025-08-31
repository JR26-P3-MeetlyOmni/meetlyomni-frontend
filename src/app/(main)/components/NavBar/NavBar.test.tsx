import { beforeEach, describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NavBar from './NavBar';

// Mock all Material-UI icons to prevent file descriptor issues
vi.mock('@mui/icons-material', () => ({
  SettingsInputComponent: vi.fn(() => null),
  SettingsInputComponentOutlined: vi.fn(() => null),
  KeyboardArrowDown: vi.fn(() => null),
  Home: vi.fn(() => null),
  ContactSupport: vi.fn(() => null),
  Person: vi.fn(() => null),
  Menu: vi.fn(() => null),
  Close: vi.fn(() => null),
}));

// Mock Material-UI components
vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Avatar: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Menu: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  MenuItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  IconButton: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

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

// Mock the DashboardUserMenu component
vi.mock('./components/DashboardUserMenu', () => ({
  default: () => <div data-testid="dashboard-user-menu">Dashboard User Menu</div>,
}));

// Mock the store hooks
vi.mock('@/store/hooks', () => ({
  useAppSelector: vi.fn(() => false), // Default to not authenticated
}));

// Mock the auth selectors
vi.mock('@/features/auth/selectors', () => ({
  selectIsAuthenticated: vi.fn(() => false),
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.clearAllMocks();
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
