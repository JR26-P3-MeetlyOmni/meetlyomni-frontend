// Branding.test.tsx
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Branding from './Branding';

describe('Branding', () => {
  it('renders illustration image', () => {
    render(<Branding />);
    const img = screen.getByAltText(/meetly illustration/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/assets/images/auth/branding-illustration.svg');
  });

  it('renders heading and descriptions', () => {
    render(<Branding />);

    expect(screen.getByText(/get started with/i)).toBeInTheDocument();
    expect(screen.getByText(/find the perfect time/i)).toBeInTheDocument();
    expect(screen.getByText(/never miss a meeting/i)).toBeInTheDocument();
    expect(screen.getByText(/say goodbye to scheduling/i)).toBeInTheDocument();
  });

  it('renders decoration image', () => {
    render(<Branding />);
    const decoration = screen.getByAltText(/branding decoration/i);
    expect(decoration).toBeInTheDocument();
    expect(decoration).toHaveAttribute(
      'src',
      '/assets/images/auth/branding-decoration-bottom-left.svg',
    );
  });
});
