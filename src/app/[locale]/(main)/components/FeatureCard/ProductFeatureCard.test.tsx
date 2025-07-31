import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import mockImage from './mocks/mockImage';
import ProductFeatureCard from './ProductFeatureCard';

describe('ProductFeatureCard', () => {
  test('renders title, description, and image correctly', () => {
    render(
      <ProductFeatureCard
        imageUrl={mockImage}
        title="Fast Support"
        description="24/7 expert assistance for all your needs"
      />,
    );

    expect(screen.getByText('Fast Support')).toBeInTheDocument();

    expect(screen.getByText('24/7 expert assistance for all your needs')).toBeInTheDocument();

    const img = screen.getByAltText('Fast Support feature illustration');

    expect(img).toBeInTheDocument();
  });
});
