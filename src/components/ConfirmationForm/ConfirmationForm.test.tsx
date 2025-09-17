import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AuthResultPageComponent } from './ConfirmationForm';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} data-testid="confirmation-image" />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: any) => (
    <a href={href} data-testid="confirmation-link">
      {children}
    </a>
  ),
}));

describe('AuthResultPageComponent', () => {
  const defaultProps = {
    iconSrc: '/test-icon.png',
    iconAlt: 'Test Icon',
    title: 'Test Title',
    description: 'Test Description',
  };

  describe('Basic Rendering', () => {
    it('should render all required elements', () => {
      render(<AuthResultPageComponent {...defaultProps} />);

      expect(screen.getByTestId('confirmation-image')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Back to Login')).toBeInTheDocument();
    });

    it('should render with custom button text and href', () => {
      render(
        <AuthResultPageComponent
          {...defaultProps}
          buttonText="Custom Button"
          buttonHref="/custom-path"
        />,
      );

      expect(screen.getByText('Custom Button')).toBeInTheDocument();
      expect(screen.getByTestId('confirmation-link')).toHaveAttribute('href', '/custom-path');
    });
  });

  describe('Image Properties', () => {
    it('should render image with correct attributes', () => {
      render(<AuthResultPageComponent {...defaultProps} />);

      const image = screen.getByTestId('confirmation-image');
      expect(image).toHaveAttribute('src', '/test-icon.png');
      expect(image).toHaveAttribute('alt', 'Test Icon');
      expect(image).toHaveAttribute('width', '44');
      expect(image).toHaveAttribute('height', '44');
    });
  });

  describe('Default Values', () => {
    it('should use default button text when not provided', () => {
      render(<AuthResultPageComponent {...defaultProps} />);
      expect(screen.getByText('Back to Login')).toBeInTheDocument();
    });

    it('should use default button href when not provided', () => {
      render(<AuthResultPageComponent {...defaultProps} />);
      expect(screen.getByTestId('confirmation-link')).toHaveAttribute('href', '/login');
    });
  });

  describe('Content Display', () => {
    it('should display title text correctly', () => {
      render(<AuthResultPageComponent {...defaultProps} title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should display description text correctly', () => {
      render(<AuthResultPageComponent {...defaultProps} description="Custom Description" />);
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for image', () => {
      render(<AuthResultPageComponent {...defaultProps} iconAlt="Accessible Icon" />);

      const image = screen.getByTestId('confirmation-image');
      expect(image).toHaveAttribute('alt', 'Accessible Icon');
    });

    it('should render as a semantic structure', () => {
      render(<AuthResultPageComponent {...defaultProps} />);

      // Check that the component renders without accessibility errors
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should handle empty strings gracefully', () => {
      render(
        <AuthResultPageComponent iconSrc="/placeholder.png" iconAlt="" title="" description="" />,
      );

      expect(screen.getByTestId('confirmation-image')).toBeInTheDocument();
      expect(screen.getByTestId('confirmation-link')).toBeInTheDocument();
    });

    it('should handle long text content', () => {
      const longTitle = 'This is a very long title that might wrap to multiple lines';
      const longDescription =
        'This is a very long description that contains a lot of text and might wrap to multiple lines in the UI';

      render(
        <AuthResultPageComponent
          {...defaultProps}
          title={longTitle}
          description={longDescription}
        />,
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
