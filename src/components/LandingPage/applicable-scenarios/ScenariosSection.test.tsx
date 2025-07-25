import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { ScenariosSectionProps } from './interface';
import ScenariosSection from './ScenariosSection';

describe('ScenariosSection', () => {
  const mockProps: ScenariosSectionProps = {
    title: 'Test Scenarios',
    scenarios: [
      {
        id: '1',
        title: 'Scenario 1',
        image: '/img1.jpg',
        imageAlt: 'Alt 1',
        descriptions: ['Desc 1'],
      },
      {
        id: '2',
        title: 'Scenario 2',
        image: '/img2.jpg',
        imageAlt: 'Alt 2',
        descriptions: ['Desc 2'],
      },
    ],
    className: '',
  };

  it('renders title correctly', () => {
    render(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Test Scenarios')).toBeInTheDocument();
  });

  it('renders all scenario cards', () => {
    render(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Scenario 1')).toBeInTheDocument();
    expect(screen.getByText('Scenario 2')).toBeInTheDocument();
  });

  it('renders descriptions inside each card', () => {
    render(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 2')).toBeInTheDocument();
  });
});
