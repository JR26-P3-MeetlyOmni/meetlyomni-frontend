import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HeroSection from './HeroSection';

describe('HeroSection', () => {
  test('renders hero section with correct title and description', () => {
    render(<HeroSection />);

    expect(
      screen.getByText('Enhance Each Activity To Be More Intelligent, Enjoyable, And Productive'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Meetly Omni is an interactive platform for corporate events, launches, training sessions and community gatherings to make your audience more engaged, interactive and fun!',
      ),
    ).toBeInTheDocument();
  });

  test('renders correct CTA buttons', () => {
    render(<HeroSection />);

    const createButton = screen.getByText('Create Activity');
    expect(createButton).toBeInTheDocument();
    expect(createButton.closest('button')).toHaveAttribute('type', 'button');

    const joinButton = screen.getByText('Join the Game');
    expect(joinButton).toBeInTheDocument();
    expect(joinButton.closest('button')).toHaveAttribute('type', 'button');
  });
});
