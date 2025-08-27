import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import FormBackgroundIcon from '../AuthBackgroundElements/FormBackgroundIcon';
import GlassIcon from '../AuthBackgroundElements/GlassIcon';
import Logo from '../AuthBackgroundElements/Logo';
import LookingForIcon from '../AuthBackgroundElements/LookingForIcon';
import MarkIcon from '../AuthBackgroundElements/MarkIcon';
import RachelIcon from '../AuthBackgroundElements/RachelIcon';
import StarIcon from '../AuthBackgroundElements/StarIcon';
import TopCenterSketch from '../AuthBackgroundElements/TopCenterSketch';

// Mock Next.js Image for components that use it
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} data-testid="next-image" />
  ),
}));

// Mock shared wrappers to render simple DOM so we can assert presence
vi.mock('../AuthBackgroundElements/shared', async orig => {
  const actual = await orig();
  return {
    ...actual,
    LogoWrapper: ({ children }: any) => <div data-testid="logo-wrapper">{children}</div>,
    TopCenterSketch: ({ zIndex }: any) => (
      <div data-testid="top-center-sketch" data-zindex={zIndex} />
    ),
    ImageElement: ({ config }: any) => (
      <div data-testid="image-element">
        <img src={config.src} alt={config.alt} width={config.width} height={config.height} />
      </div>
    ),
  };
});

describe('AuthBackgroundElements - smoke tests', () => {
  it('renders Logo with image', () => {
    render(<Logo />);
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument();
    // image rendered by next/image mock
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
  });

  it('renders TopCenterSketch wrapper', () => {
    render(<TopCenterSketch />);
    expect(screen.getByTestId('top-center-sketch')).toBeInTheDocument();
  });

  it('renders FormBackgroundIcon via ImageElement', () => {
    render(<FormBackgroundIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });

  it('renders GlassIcon via ImageElement', () => {
    render(<GlassIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });

  it('renders LookingForIcon via ImageElement', () => {
    render(<LookingForIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });

  it('renders MarkIcon via ImageElement', () => {
    render(<MarkIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });

  it('renders RachelIcon via ImageElement', () => {
    render(<RachelIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });

  it('renders StarIcon via ImageElement', () => {
    render(<StarIcon />);
    expect(screen.getByTestId('image-element')).toBeInTheDocument();
  });
});
