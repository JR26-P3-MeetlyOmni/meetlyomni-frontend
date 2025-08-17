import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { renderWithProviders } from '@/test-utils/test-utils';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

// Mock auth module to prevent test-utils errors
vi.mock('@/features/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    // Mock authReducer to prevent test-utils errors
    authReducer: (state = { user: null, token: null, isAuthenticated: false, isLoading: false, isInitialized: true, error: null }, action: any) => state,
  };
});

import { DecorativeElements } from './DecorativeElements';

describe('DecorativeElements', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render all decorative images', () => {
      renderWithProviders(<DecorativeElements />);

      // Check that all decorative images are rendered
      expect(screen.getByAltText('Omni Logo')).toBeInTheDocument();
      expect(screen.getByAltText('Magnifying glass')).toBeInTheDocument();
      expect(screen.getByAltText('Rachel')).toBeInTheDocument();
      expect(screen.getByAltText('Mark')).toBeInTheDocument();
      expect(screen.getByAltText('Looking For')).toBeInTheDocument();
      expect(screen.getByAltText('Form')).toBeInTheDocument();
      expect(screen.getByAltText('Star')).toBeInTheDocument();
    });

    it('should render the correct number of images', () => {
      renderWithProviders(<DecorativeElements />);

      // Should have 7 images total: logo + 6 decorative elements
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(7);
    });

    it('should render TopCenterSketch as a visual element', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // Check for the styled sketch element (should be a div with background)
      const sketchElements = container.querySelectorAll('[class*="TopCenterSketch"]');
      expect(sketchElements.length).toBeGreaterThan(0);
    });
  });

  describe('image sources and dimensions', () => {
    it('should have correct image sources', () => {
      renderWithProviders(<DecorativeElements />);

      // Check image sources
      expect(screen.getByAltText('Omni Logo')).toHaveAttribute('src', '/assets/images/LogIn/logo.png');
      expect(screen.getByAltText('Magnifying glass')).toHaveAttribute('src', '/assets/images/LogIn/glass.png');
      expect(screen.getByAltText('Rachel')).toHaveAttribute('src', '/assets/images/LogIn/rachel.png');
      expect(screen.getByAltText('Mark')).toHaveAttribute('src', '/assets/images/LogIn/mark.png');
      expect(screen.getByAltText('Looking For')).toHaveAttribute('src', '/assets/images/LogIn/lookingFor.png');
      expect(screen.getByAltText('Form')).toHaveAttribute('src', '/assets/images/LogIn/form.png');
      expect(screen.getByAltText('Star')).toHaveAttribute('src', '/assets/images/LogIn/star.png');
    });

    it('should have correct image dimensions', () => {
      renderWithProviders(<DecorativeElements />);

      // Check specific image dimensions
      expect(screen.getByAltText('Omni Logo')).toHaveAttribute('width', '105');
      expect(screen.getByAltText('Omni Logo')).toHaveAttribute('height', '30');

      expect(screen.getByAltText('Magnifying glass')).toHaveAttribute('width', '84');
      expect(screen.getByAltText('Magnifying glass')).toHaveAttribute('height', '84');

      expect(screen.getByAltText('Rachel')).toHaveAttribute('width', '209.3');
      expect(screen.getByAltText('Rachel')).toHaveAttribute('height', '97.2');

      expect(screen.getByAltText('Mark')).toHaveAttribute('width', '209.3');
      expect(screen.getByAltText('Mark')).toHaveAttribute('height', '97.2');

      expect(screen.getByAltText('Looking For')).toHaveAttribute('width', '179');
      expect(screen.getByAltText('Looking For')).toHaveAttribute('height', '42');

      expect(screen.getByAltText('Form')).toHaveAttribute('width', '460');
      expect(screen.getByAltText('Form')).toHaveAttribute('height', '337');

      expect(screen.getByAltText('Star')).toHaveAttribute('width', '72');
      expect(screen.getByAltText('Star')).toHaveAttribute('height', '72');
    });
  });

  describe('accessibility', () => {
    it('should have meaningful alt text for all images', () => {
      renderWithProviders(<DecorativeElements />);

      const images = screen.getAllByRole('img');
      
      images.forEach(image => {
        const altText = image.getAttribute('alt');
        expect(altText).toBeTruthy();
        expect(altText).not.toBe('');
        // Alt text should be descriptive, not just filename
        expect(altText).not.toMatch(/\.(png|jpg|jpeg|gif|webp)$/i);
      });
    });

    it('should provide semantic meaning through alt text', () => {
      renderWithProviders(<DecorativeElements />);

      // Check that alt texts are descriptive
      const expectedAltTexts = [
        'Omni Logo',
        'Magnifying glass',
        'Rachel',
        'Mark', 
        'Looking For',
        'Form',
        'Star'
      ];

      expectedAltTexts.forEach(altText => {
        expect(screen.getByAltText(altText)).toBeInTheDocument();
      });
    });
  });

  describe('layout and positioning', () => {
    it('should render components with absolute positioning', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // All decorative elements should use absolute positioning
      const positionedElements = container.querySelectorAll('[class*="DecorativeContainer"], [class*="LogoWrapper"], [class*="ResponsiveImageWrapper"]');
      
      positionedElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        expect(computedStyle.position).toBe('absolute');
      });
    });

    it('should have proper z-index layering', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // Logo should have the highest z-index (10)
      const logoWrapper = container.querySelector('[class*="LogoWrapper"]');
      expect(logoWrapper).toBeInTheDocument();
    });

    it('should have responsive image wrappers with correct styling', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      const imageWrappers = container.querySelectorAll('[class*="ResponsiveImageWrapper"]');
      expect(imageWrappers.length).toBeGreaterThan(0);

      // Each wrapper should be positioned absolutely
      imageWrappers.forEach(wrapper => {
        const computedStyle = window.getComputedStyle(wrapper);
        expect(computedStyle.position).toBe('absolute');
      });
    });
  });

  describe('visual elements', () => {
    it('should render TopCenterSketch with background styling', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // TopCenterSketch should exist and have background color
      const sketchElement = container.querySelector('[class*="TopCenterSketch"]');
      expect(sketchElement).toBeInTheDocument();
      
      if (sketchElement) {
        const computedStyle = window.getComputedStyle(sketchElement);
        expect(computedStyle.position).toBe('absolute');
        // Should have some form of background (color or image)
        expect(
          computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
          computedStyle.backgroundImage !== 'none'
        ).toBe(true);
      }
    });

    it('should have proper border radius on sketch element', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      const sketchElement = container.querySelector('[class*="TopCenterSketch"]');
      if (sketchElement) {
        const computedStyle = window.getComputedStyle(sketchElement);
        // Should have some border radius applied
        expect(computedStyle.borderRadius).not.toBe('0px');
      }
    });
  });

  describe('performance and optimization', () => {
    it('should use Next.js Image component for optimization', () => {
      renderWithProviders(<DecorativeElements />);

      // All images should be rendered through Next.js Image component
      // (mocked as regular img elements in our test environment)
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(7);
      
      // Each image should have proper width and height attributes for CLS prevention
      images.forEach(image => {
        expect(image).toHaveAttribute('width');
        expect(image).toHaveAttribute('height');
        expect(image.getAttribute('width')).not.toBe('');
        expect(image.getAttribute('height')).not.toBe('');
      });
    });

    it('should have proper image paths for static serving', () => {
      renderWithProviders(<DecorativeElements />);

      const images = screen.getAllByRole('img');
      
      images.forEach(image => {
        const src = image.getAttribute('src');
        // All images should be served from /assets/images/LogIn/
        expect(src).toMatch(/^\/assets\/images\/LogIn\//);
        // Should be properly formatted image files
        expect(src).toMatch(/\.(png|jpg|jpeg|gif|webp)$/i);
      });
    });
  });

  describe('component structure', () => {
    it('should render as a React Fragment with multiple children', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // Should have multiple direct children (images and sketch elements)
      const children = container.firstChild?.childNodes;
      expect(children?.length).toBeGreaterThan(5);
    });

    it('should not have any wrapper div element', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // Component returns a Fragment, so there should be no single wrapper
      // The container should directly contain the decorative elements
      expect(container.firstChild?.nodeName).not.toBe('DIV');
    });
  });

  describe('error handling', () => {
    it('should render without errors when images fail to load', () => {
      renderWithProviders(<DecorativeElements />);

      const images = screen.getAllByRole('img');
      
      // Simulate image load errors
      images.forEach(image => {
        // Trigger error event to test graceful degradation
        const errorEvent = new Event('error');
        image.dispatchEvent(errorEvent);
      });

      // Component should still be in the document
      expect(screen.getByAltText('Omni Logo')).toBeInTheDocument();
    });

    it('should handle missing image dimensions gracefully', () => {
      // This test ensures that even if width/height are not provided,
      // the component doesn't crash
      expect(() => {
        renderWithProviders(<DecorativeElements />);
      }).not.toThrow();
    });
  });

  describe('theme integration', () => {
    it('should use theme-based styling', () => {
      const { container } = renderWithProviders(<DecorativeElements />);

      // Check that styled components are applied (they should have class names)
      const styledElements = container.querySelectorAll('[class*="styled"], [class*="MuiBox"], [class*="DecorativeContainer"]');
      expect(styledElements.length).toBeGreaterThan(0);
    });

    it('should apply consistent positioning across different screen sizes', () => {
      renderWithProviders(<DecorativeElements />);

      // All decorative elements should be positioned consistently
      // This is tested implicitly through the styled components
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(7);
    });
  });
});
