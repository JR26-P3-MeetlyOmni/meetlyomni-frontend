// src/components/SigninButton/SigninButton.test.tsx
import { describe, expect, it, vi } from 'vitest';
import React from 'react';

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { SigninButton } from './SigninButton';

(globalThis as any).React = React;

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
    it('should render signin button text', () => {
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

  describe('Link Structure (Button-like anchor)', () => {
    it('should render as an anchor styled like a MUI button', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('MuiButton-root');
    });

    it('should have startIcon (arrow) inside the anchor', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      expect(link).toContainElement(arrowIcon);
    });

    it('should contain "Sign In" text inside the anchor', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveTextContent('Sign In');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard focusable (as a link)', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      expect(link).toHaveFocus();
    });

    it('should keep correct link semantics', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signin');
    });
  });

  describe('User Interaction', () => {
    it('should handle click events (no errors)', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(() => fireEvent.click(link)).not.toThrow();
    });

    it('should navigate to signin page (href present)', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/signin');
    });
  });

  describe('Consistency', () => {
    it('should render consistently on rerender', () => {
      const { rerender } = render(<SigninButton />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();

      rerender(<SigninButton />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should keep icon and text nested correctly', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      expect(link).toContainElement(arrowIcon);
      expect(link).toContainElement(signInText);
    });
  });
});
