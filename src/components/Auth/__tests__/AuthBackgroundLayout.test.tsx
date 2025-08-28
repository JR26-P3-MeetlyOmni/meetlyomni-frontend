import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import {
  DECORATIVE_DIMENSIONS,
  DECORATIVE_SPACING,
  DecorativeContainer,
  ImageElement,
  ResponsiveImageWrapper,
  TopCenterSketch,
} from '../AuthPageDecorativeElements/AuthBackgroundLayout';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe('AuthBackgroundLayout', () => {
  describe('Constants', () => {
    it('should export correct DECORATIVE_SPACING constants', () => {
      expect(DECORATIVE_SPACING.LOGO_BASE).toBe(3);
      expect(DECORATIVE_SPACING.LOGO_SM).toBe(4);
      expect(DECORATIVE_SPACING.LOGO_MD).toBe(5);
      expect(DECORATIVE_SPACING.LOGO_LG_TOP).toBe(3.5);
      expect(DECORATIVE_SPACING.LOGO_LG_LEFT).toBe(6);
      expect(DECORATIVE_SPACING.SKETCH_TOP).toBe(8);
    });

    it('should export correct DECORATIVE_DIMENSIONS constants', () => {
      expect(DECORATIVE_DIMENSIONS.SKETCH_WIDTH_BASE).toBe(300);
      expect(DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_BASE).toBe(180);
      expect(DECORATIVE_DIMENSIONS.SKETCH_WIDTH_MD).toBe(350);
      expect(DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_MD).toBe(210);
      expect(DECORATIVE_DIMENSIONS.BORDER_RADIUS_MULTIPLIER).toBe(2);
    });
  });

  describe('DecorativeContainer', () => {
    it('should render with default props', () => {
      render(<DecorativeContainer data-testid="decorative-container" />);
      const container = screen.getByTestId('decorative-container');
      expect(container).toBeInTheDocument();
    });

    it('should render with custom zIndex and opacity', () => {
      render(
        <DecorativeContainer data-testid="decorative-container" zIndex={1000} opacity={0.5} />,
      );
      const container = screen.getByTestId('decorative-container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('TopCenterSketch', () => {
    it('should render correctly', () => {
      render(<TopCenterSketch data-testid="top-center-sketch" />);
      const sketch = screen.getByTestId('top-center-sketch');
      expect(sketch).toBeInTheDocument();
    });
  });

  describe('ResponsiveImageWrapper', () => {
    it('should render with position props', () => {
      render(
        <ResponsiveImageWrapper
          data-testid="responsive-wrapper"
          top="10px"
          left="20px"
          imageWidth="100px"
          imageHeight="50px"
        />,
      );
      const wrapper = screen.getByTestId('responsive-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with transform prop', () => {
      render(
        <ResponsiveImageWrapper data-testid="responsive-wrapper" transform="translateX(-50%)" />,
      );
      const wrapper = screen.getByTestId('responsive-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('ImageElement', () => {
    it('should render with config props', () => {
      const mockConfig = {
        src: '/test-image.png',
        alt: 'Test Image',
        width: 100,
        height: 100,
        position: {
          top: '10px',
          left: '20px',
        },
        styles: {
          imageWidth: '100px',
          imageHeight: '100px',
        },
      };

      render(<ImageElement config={mockConfig} />);
      const image = screen.getByAltText('Test Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test-image.png');
      expect(image).toHaveAttribute('width', '100');
      expect(image).toHaveAttribute('height', '100');
    });

    it('should render with minimal config', () => {
      const minimalConfig = {
        src: '/minimal-image.png',
        alt: 'Minimal Image',
        width: 50,
        height: 50,
        position: {},
        styles: {},
      };

      render(<ImageElement config={minimalConfig} />);
      const image = screen.getByAltText('Minimal Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/minimal-image.png');
    });
  });
});
