import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import FeatureCard from './FeatureCard';

describe('FeatureCard Section', () => {
  test('renders section title and project/product feature items', () => {
    render(<FeatureCard />);

    // section title
    expect(screen.getByText('Product Features')).toBeInTheDocument();

    // project features (top grid)
    expect(screen.getByText('Activities & Team management')).toBeInTheDocument();
    expect(screen.getByText('Intelligent match')).toBeInTheDocument();

    // product features (bottom grid)
    expect(screen.getByText('No download required')).toBeInTheDocument();
  });
});
