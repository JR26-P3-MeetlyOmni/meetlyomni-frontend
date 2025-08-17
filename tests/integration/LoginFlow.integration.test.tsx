import LoginPage from '@/app/(auth)/login/page';
import { authReducer } from '@/features/auth';
import { renderWithProviders } from '@/test-utils/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Next.js navigation
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/login',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock the auth API
vi.mock('@/features/auth/api/authApi', () => ({
  signIn: vi.fn(),
}));

// Define proper types for mock Image component
interface MockImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Mock AuthGuard and Image components for integration tests
vi.mock('@/features/auth', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    AuthGuard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, style, ...props }: MockImageProps) => (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'block',
        ...style,
      }}
      role="img"
      aria-label={alt}
      {...props}
    />
  ),
}));

describe('Login Flow Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Create real Redux store for integration testing with proper initial state
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true, // Important: set to true to skip loading state
          error: null,
        },
      },
    });

    // Clear all mocks
    vi.clearAllMocks();

    // Reset localStorage
    localStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Login Page Rendering', () => {
    it('should render login form correctly', async () => {
      renderWithProviders(<LoginPage />, { store });

      // Step 1: Verify initial state
      expect(store.getState().auth.isAuthenticated).toBe(false);
      expect(store.getState().auth.user).toBeNull();
      expect(store.getState().auth.token).toBeNull();

      // Step 2: Verify form elements are present
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

      // Step 3: Verify additional UI elements
      expect(screen.getByText(/welcome to omni/i)).toBeInTheDocument();
      expect(screen.getByText(/let's sign in your profile/i)).toBeInTheDocument();
      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
      expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    });

    it('should allow user input in form fields', async () => {
      const user = userEvent.setup({ delay: null }); // Remove delay for faster tests
      renderWithProviders(<LoginPage />, { store });

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      // Test email input
      await user.type(emailInput, 'test@example.com');
      expect(emailInput).toHaveValue('test@example.com');

      // Test password input
      await user.type(passwordInput, 'password123');
      expect(passwordInput).toHaveValue('password123');
    });
  });

  describe('Form Validation Integration', () => {
    it('should accept valid form inputs', async () => {
      const user = userEvent.setup({ delay: null }); // Remove delay for faster tests
      renderWithProviders(<LoginPage />, { store });

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');

      // Enter valid inputs
      await user.type(emailInput, 'valid@example.com');
      await user.type(passwordInput, 'ValidPassword123');

      // Verify inputs have correct values
      expect(emailInput).toHaveValue('valid@example.com');
      expect(passwordInput).toHaveValue('ValidPassword123');
    });

    it('should show submit button is enabled with valid inputs', async () => {
      const user = userEvent.setup({ delay: null }); // Remove delay for faster tests
      renderWithProviders(<LoginPage />, { store });

      const emailInput = screen.getByPlaceholderText('Email Address');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Initially button should be enabled
      expect(submitButton).toBeEnabled();

      // Enter valid inputs
      await user.type(emailInput, 'valid@example.com');
      await user.type(passwordInput, 'ValidPassword123');

      // Button should still be enabled
      expect(submitButton).toBeEnabled();
    });
  });

  describe('Redux Integration', () => {
    it('should have correct initial Redux state', () => {
      renderWithProviders(<LoginPage />, { store });

      // Verify initial auth state
      expect(store.getState().auth.isAuthenticated).toBe(false);
      expect(store.getState().auth.user).toBeNull();
      expect(store.getState().auth.token).toBeNull();
      expect(store.getState().auth.error).toBeNull();
      expect(store.getState().auth.isLoading).toBe(false);
      expect(store.getState().auth.isInitialized).toBe(true);
    });

    it('should render correctly with Redux provider', () => {
      renderWithProviders(<LoginPage />, { store });

      // Verify page renders with Redux connection
      expect(screen.getByText(/welcome to omni/i)).toBeInTheDocument();
      expect(screen.getByText(/let's sign in your profile/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should integrate login page with auth form components', () => {
      renderWithProviders(<LoginPage />, { store });

      // Verify decorative elements render (using aria-label since we mock with div + role="img")
      expect(screen.getByLabelText('Omni Logo')).toBeInTheDocument();
      expect(screen.getByLabelText('Rachel')).toBeInTheDocument();
      expect(screen.getByLabelText('Mark')).toBeInTheDocument();

      // Verify form components render
      expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

      // Verify links render
      expect(screen.getByText('Forgot Password ?')).toBeInTheDocument();
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });

    it('should maintain consistent styling across components', () => {
      renderWithProviders(<LoginPage />, { store });

      // Verify container has correct MUI classes
      const container = document.querySelector('.MuiContainer-root');
      expect(container).toBeInTheDocument();

      // Verify form has proper styling
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveStyle({ maxWidth: '412px' });
    });
  });
});
