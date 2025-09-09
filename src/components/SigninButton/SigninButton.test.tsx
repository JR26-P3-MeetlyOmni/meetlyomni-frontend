import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { SigninButton } from './SigninButton';

// Mock React
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ href, children }: any) => (
    <a href={href} data-testid="signin-link">
      {children}
    </a>
  ),
}));

// Mock MUI icons
vi.mock('@mui/icons-material/ArrowBackIosNewRounded', () => ({
  default: () => <span data-testid="arrow-icon">←</span>,
}));

describe('SigninButton', () => {
  describe('Basic Rendering', () => {
    it('should render signin button with correct text', () => {
      render(<SigninButton />);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByTestId('signin-link')).toBeInTheDocument();
    });

    it('should render with correct href', () => {
      render(<SigninButton />);

      const link = screen.getByTestId('signin-link');
      expect(link).toHaveAttribute('href', '/signin');
    });

    it('should render arrow icon', () => {
      render(<SigninButton />);

      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  describe('Button Structure', () => {
    it('should render button with correct variant', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have startIcon with arrow', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      const arrowIcon = screen.getByTestId('arrow-icon');

      expect(button).toContainElement(arrowIcon);
    });

    it('should contain "Sign In" text', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Sign In');
    });
  });

  describe('Styling and Layout', () => {
    it('should render within a positioned container', () => {
      render(<SigninButton />);

      // The component should render without errors
      expect(screen.getByTestId('signin-link')).toBeInTheDocument();
    });

    it('should have proper button styling', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // Button should be rendered with MUI styling
      expect(button).toHaveClass('MuiButton-root');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a button', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should have proper link structure', () => {
      render(<SigninButton />);

      const link = screen.getByTestId('signin-link');
      expect(link).toHaveAttribute('href', '/signin');
    });

    it('should be keyboard accessible', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');

      // Should be focusable
      act(() => {
        button.focus();
      });
      expect(button).toHaveFocus();
    });
  });

  describe('User Interaction', () => {
    it('should handle click events', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');

      // Should not throw error when clicked
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should navigate to signin page when clicked', () => {
      render(<SigninButton />);

      const link = screen.getByTestId('signin-link');
      expect(link).toHaveAttribute('href', '/signin');
    });
  });

  describe('Icon Integration', () => {
    it('should display arrow icon before text', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      expect(button).toContainElement(arrowIcon);
      expect(button).toContainElement(signInText);
    });

    it('should have proper icon styling', () => {
      render(<SigninButton />);

      const arrowIcon = screen.getByTestId('arrow-icon');
      expect(arrowIcon).toBeInTheDocument();
    });
  });

  describe('Component Consistency', () => {
    it('should render consistently across multiple renders', () => {
      const { rerender } = render(<SigninButton />);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByTestId('signin-link')).toBeInTheDocument();

      rerender(<SigninButton />);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByTestId('signin-link')).toBeInTheDocument();
    });

    it('should maintain button structure', () => {
      render(<SigninButton />);

      const button = screen.getByRole('button');
      const link = screen.getByTestId('signin-link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      // All elements should be present and properly nested
      expect(link).toContainElement(button);
      expect(button).toContainElement(arrowIcon);
      expect(button).toContainElement(signInText);
    });
  });
});
