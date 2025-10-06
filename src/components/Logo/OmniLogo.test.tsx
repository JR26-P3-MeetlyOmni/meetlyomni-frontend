import { beforeEach, describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { TopLeftLogo } from './OmniLogo';

// Mock Next.js navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('TopLeftLogo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render logo image with correct attributes', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('nav_bar_logo.png'));
      expect(logo).toHaveAttribute('alt', 'MeetlyOmni Logo');
    });

    it('should render with custom onClick handler', () => {
      const mockOnClick = vi.fn();
      render(<TopLeftLogo onClick={mockOnClick} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Click Behavior', () => {
    it('should call custom onClick when provided', () => {
      const mockOnClick = vi.fn();
      render(<TopLeftLogo onClick={mockOnClick} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      fireEvent.click(logo);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should navigate to home page when no custom onClick is provided', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      fireEvent.click(logo);

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should prioritize custom onClick over default navigation', () => {
      const mockOnClick = vi.fn();
      render(<TopLeftLogo onClick={mockOnClick} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      fireEvent.click(logo);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('Styling and Layout', () => {
    it('should have cursor pointer style', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      expect(logo).toHaveStyle('cursor: pointer');
    });

    it('should render within a container', () => {
      render(<TopLeftLogo />);

      // The component should render without errors
      expect(screen.getByAltText('MeetlyOmni Logo')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for screen readers', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      expect(logo).toHaveAttribute('alt', 'MeetlyOmni Logo');
    });

    it('should be clickable and accessible', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      expect(logo).toBeInTheDocument();

      // Should be able to click the logo
      fireEvent.click(logo);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Props Validation', () => {
    it('should handle undefined onClick gracefully', () => {
      render(<TopLeftLogo onClick={undefined} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      fireEvent.click(logo);

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should handle null onClick gracefully', () => {
      render(<TopLeftLogo onClick={null as any} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');
      fireEvent.click(logo);

      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Multiple Clicks', () => {
    it('should handle multiple clicks correctly', () => {
      const mockOnClick = vi.fn();
      render(<TopLeftLogo onClick={mockOnClick} />);

      const logo = screen.getByAltText('MeetlyOmni Logo');

      fireEvent.click(logo);
      fireEvent.click(logo);
      fireEvent.click(logo);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('should handle multiple clicks with default navigation', () => {
      render(<TopLeftLogo />);

      const logo = screen.getByAltText('MeetlyOmni Logo');

      fireEvent.click(logo);
      fireEvent.click(logo);
      fireEvent.click(logo);

      expect(mockPush).toHaveBeenCalledTimes(3);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
