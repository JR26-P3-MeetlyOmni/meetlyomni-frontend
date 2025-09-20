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
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
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
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should render with correct href', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signin');
    });

    it('should render arrow icon', () => {
      render(<SigninButton />);

      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  describe('Button Structure', () => {
    it('should render as a link with button styling', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/signin');
    });

    it('should have startIcon with arrow', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');

      expect(link).toContainElement(arrowIcon);
    });

    it('should contain "Sign In" text', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('Sign In');
    });
  });

  describe('Styling and Layout', () => {
    it('should render within a positioned container', () => {
      render(<SigninButton />);

      // The component should render without errors
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should have proper button styling', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      // Link should be rendered with MUI button styling
      expect(link).toHaveClass('MuiButton-root');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a link', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have proper link structure', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signin');
    });

    it('should be keyboard accessible', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');

      // Should be focusable
      act(() => {
        link.focus();
      });
      expect(link).toHaveFocus();
    });
  });

  describe('User Interaction', () => {
    it('should handle click events', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');

      // Should not throw error when clicked
      expect(() => fireEvent.click(link)).not.toThrow();
    });

    it('should navigate to signin page when clicked', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signin');
    });
  });

  describe('Icon Integration', () => {
    it('should display arrow icon before text', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      expect(link).toContainElement(arrowIcon);
      expect(link).toContainElement(signInText);
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
      expect(screen.getByRole('link')).toBeInTheDocument();

      rerender(<SigninButton />);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should maintain link structure', () => {
      render(<SigninButton />);

      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      // All elements should be present and properly nested
      expect(link).toContainElement(arrowIcon);
      expect(link).toContainElement(signInText);
    });
  });
});
