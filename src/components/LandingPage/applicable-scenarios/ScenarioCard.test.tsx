import { describe, expect, it } from 'vitest';

import React from 'react';

import { render, screen } from '@testing-library/react';

import type { ScenarioCardProps } from './interface';
import ScenarioCard from './ScenarioCard';

describe('ScenarioCard', () => {
  const mockProps: ScenarioCardProps = {
    scenario: {
      id: '1',
      title: 'Mock Scenario Title',
      image: '/test-image.jpg',
      imageAlt: 'Test Image Alt Text',
      descriptions: ['Point one', 'Point two', 'Point three'],
    },
    className: '',
  };

  it('renders without crashing', () => {
    render(<ScenarioCard {...mockProps} />);
    expect(screen.getByText('Mock Scenario Title')).toBeTruthy();
  });

  it('renders all description items', () => {
    render(<ScenarioCard {...mockProps} />);
    mockProps.scenario.descriptions.forEach(desc => {
      expect(screen.getByText(desc)).toBeTruthy();
    });
  });

  it('renders image with correct alt text', () => {
    render(<ScenarioCard {...mockProps} />);
    expect(screen.getByAltText('Test Image Alt Text')).toBeTruthy();
  });
});
