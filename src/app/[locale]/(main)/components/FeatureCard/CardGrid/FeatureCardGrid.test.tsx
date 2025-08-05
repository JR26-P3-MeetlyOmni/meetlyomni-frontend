import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ProductFeaturesData, ProjectFeaturesData } from '../../../../../../constants/FeaturesData';
import FeatureCardGrid from './FeatureCardGrid';

describe('FeatureCardGrid', () => {
  test('renders FeatureCardGrid with project type correctly', () => {
    render(<FeatureCardGrid data={ProjectFeaturesData} type="project" />);

    expect(screen.getByText('Activities & Team management')).toBeInTheDocument();

    expect(screen.getByText('Intelligent match')).toBeInTheDocument();

    const img = screen.getByAltText('Game interaction feature illustration');

    expect(img).toBeInTheDocument();
  });

  test('renders FeatureCardGrid with product type correctly', () => {
    render(<FeatureCardGrid data={ProductFeaturesData} type="product" />);

    expect(screen.getByText('No download required')).toBeInTheDocument();

    expect(
      screen.getByText('Scan the code to join the interaction anytime and anywhere'),
    ).toBeInTheDocument();

    const img = screen.getByAltText('No download required feature illustration');

    expect(img).toBeInTheDocument();
  });
});
