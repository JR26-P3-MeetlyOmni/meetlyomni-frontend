import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { SigninButton } from './SigninButton';

(globalThis as any).React = React;

vi.mock('next/link', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@mui/icons-material/ArrowBackIosNewRounded', () => ({
  default: () => <span data-testid="arrow-icon">←</span>,
}));

describe('SigninButton', () => {
  describe('Basic Rendering', () => {
    it('renders text and link', () => {
      render(<SigninButton />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('has correct href', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/login');
    });

    it('renders arrow icon', () => {
      render(<SigninButton />);
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
    });
  });

  describe('Link structure & styling', () => {
    it('is an anchor styled like MUI button', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/login');
    });

    it('contains icon and text inside the anchor', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      expect(link).toContainElement(arrowIcon);
      expect(link).toContainElement(signInText);
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
      expect(link).toHaveAttribute('href', '/login');
    });

    it('should be keyboard accessible', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      expect(link).toHaveFocus();
    });

    it('keeps correct link semantics', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/login');
    });
  });

  describe('Consistency', () => {
    it('renders consistently on rerender', () => {
      const { rerender } = render(<SigninButton />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();

      rerender(<SigninButton />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('keeps icon and text nested correctly', () => {
      render(<SigninButton />);
      const link = screen.getByRole('link');
      const arrowIcon = screen.getByTestId('arrow-icon');
      const signInText = screen.getByText('Sign In');

      expect(link).toContainElement(arrowIcon);
      expect(link).toContainElement(signInText);
    });
  });
});
