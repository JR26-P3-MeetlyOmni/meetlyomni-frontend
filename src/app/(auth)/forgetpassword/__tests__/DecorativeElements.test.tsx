import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { DecorativeElements } from '../components/DecorativeElements';

// Mock the Auth components
vi.mock('@/components/Auth', () => ({
  FormBackgroundIcon: () => <div data-testid="form-background-icon">FormBackgroundIcon</div>,
  GlassIcon: () => <div data-testid="glass-icon">GlassIcon</div>,
  Logo: () => <div data-testid="logo">Logo</div>,
  LookingForIcon: () => <div data-testid="looking-for-icon">LookingForIcon</div>,
  MarkIcon: () => <div data-testid="mark-icon">MarkIcon</div>,
  RachelIcon: () => <div data-testid="rachel-icon">RachelIcon</div>,
  StarIcon: () => <div data-testid="star-icon">StarIcon</div>,
  TopCenterSketch: () => <div data-testid="top-center-sketch">TopCenterSketch</div>,
}));

describe('DecorativeElements', () => {
  it('renders all decorative elements', () => {
    render(<DecorativeElements />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('top-center-sketch')).toBeInTheDocument();
    expect(screen.getByTestId('rachel-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mark-icon')).toBeInTheDocument();
    expect(screen.getByTestId('glass-icon')).toBeInTheDocument();
    expect(screen.getByTestId('looking-for-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('form-background-icon')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<DecorativeElements />)).not.toThrow();
  });
});
