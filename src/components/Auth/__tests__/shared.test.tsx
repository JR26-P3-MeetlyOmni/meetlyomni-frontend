import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { DECORATIVE_DIMENSIONS, DECORATIVE_SPACING, ImageElement } from './shared';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} data-testid="image-element" />
  ),
}));

describe('DECORATIVE_SPACING constants', () => {
  it('has correct spacing values', () => {
    expect(DECORATIVE_SPACING.LOGO_BASE).toBe(3);
    expect(DECORATIVE_SPACING.LOGO_SM).toBe(4);
    expect(DECORATIVE_SPACING.LOGO_MD).toBe(5);
    expect(DECORATIVE_SPACING.LOGO_LG_TOP).toBe(3.5);
    expect(DECORATIVE_SPACING.LOGO_LG_LEFT).toBe(6);
    expect(DECORATIVE_SPACING.SKETCH_TOP).toBe(8);
  });
});

describe('DECORATIVE_DIMENSIONS constants', () => {
  it('has correct dimension values', () => {
    expect(DECORATIVE_DIMENSIONS.SKETCH_WIDTH_BASE).toBe(300);
    expect(DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_BASE).toBe(180);
    expect(DECORATIVE_DIMENSIONS.SKETCH_WIDTH_MD).toBe(350);
    expect(DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_MD).toBe(210);
    expect(DECORATIVE_DIMENSIONS.BORDER_RADIUS_MULTIPLIER).toBe(2);
  });
});

describe('ImageElement component', () => {
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

  it('renders with correct image attributes', () => {
    render(<ImageElement config={mockConfig} />);

    const image = screen.getByTestId('image-element');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
    expect(image).toHaveAttribute('alt', 'Test Image');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('renders without crashing', () => {
    expect(() => render(<ImageElement config={mockConfig} />)).not.toThrow();
  });

  it('handles config with minimal properties', () => {
    const minimalConfig = {
      src: '/minimal.png',
      alt: 'Minimal',
      width: 50,
      height: 50,
      position: {},
      styles: {},
    };

    render(<ImageElement config={minimalConfig} />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });
});
