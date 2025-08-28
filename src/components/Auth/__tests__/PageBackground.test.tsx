import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { PageBackground } from '../PageBackground';

// Mock the decorative components to avoid complex rendering
vi.mock('../AuthPageDecorativeElements/AuthBackgroundIcons', () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
  GlassIcon: () => <div data-testid="glass-icon">GlassIcon</div>,
  RachelIcon: () => <div data-testid="rachel-icon">RachelIcon</div>,
  MarkIcon: () => <div data-testid="mark-icon">MarkIcon</div>,
  LookingForIcon: () => <div data-testid="looking-for-icon">LookingForIcon</div>,
  StarIcon: () => <div data-testid="star-icon">StarIcon</div>,
  FormBackgroundIcon: () => <div data-testid="form-background-icon">FormBackgroundIcon</div>,
}));

vi.mock('../AuthPageDecorativeElements/AuthBackgroundLayout', () => ({
  TopCenterSketch: () => <div data-testid="top-center-sketch">TopCenterSketch</div>,
}));

describe('PageBackground', () => {
  it('renders without crashing', () => {
    expect(() => render(<PageBackground />)).not.toThrow();
  });

  it('renders all decorative elements', () => {
    render(<PageBackground />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('top-center-sketch')).toBeInTheDocument();
    expect(screen.getByTestId('rachel-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mark-icon')).toBeInTheDocument();
    expect(screen.getByTestId('glass-icon')).toBeInTheDocument();
    expect(screen.getByTestId('looking-for-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('form-background-icon')).toBeInTheDocument();
  });

  it('renders children content', () => {
    const testContent = 'Test Form Content';
    render(
      <PageBackground>
        <div>{testContent}</div>
      </PageBackground>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <PageBackground>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </PageBackground>,
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<PageBackground />);

    // Should still render all decorative elements
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('top-center-sketch')).toBeInTheDocument();
    expect(screen.getByTestId('rachel-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mark-icon')).toBeInTheDocument();
    expect(screen.getByTestId('glass-icon')).toBeInTheDocument();
    expect(screen.getByTestId('looking-for-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('form-background-icon')).toBeInTheDocument();
  });

  it('has correct container structure', () => {
    const { container } = render(<PageBackground />);

    // Check if the main container exists
    const pageContainer = container.firstChild;
    expect(pageContainer).toBeInTheDocument();

    // Check if it has the expected structure with all decorative elements
    expect(pageContainer).toHaveTextContent('Logo');
    expect(pageContainer).toHaveTextContent('TopCenterSketch');
    expect(pageContainer).toHaveTextContent('RachelIcon');
    expect(pageContainer).toHaveTextContent('MarkIcon');
    expect(pageContainer).toHaveTextContent('GlassIcon');
    expect(pageContainer).toHaveTextContent('LookingForIcon');
    expect(pageContainer).toHaveTextContent('StarIcon');
    expect(pageContainer).toHaveTextContent('FormBackgroundIcon');
  });
});
