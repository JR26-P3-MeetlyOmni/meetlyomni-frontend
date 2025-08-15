import { SCENARIO_DATA } from '@/constants/ScenariosData';
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';

import ScenariosSection from './ScenarioSection';
import type { ScenariosSectionProps } from './types';

describe('ScenariosSection', () => {
  const mockProps: ScenariosSectionProps = {
    title: 'Test Scenarios',
    className: '',
  };

  it('renders title correctly', () => {
    render(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Test Scenarios')).toBeInTheDocument();
  });

  it('renders default title when not provided', () => {
    render(<ScenariosSection />);
    expect(screen.getByText('Applicable Scenarios')).toBeInTheDocument();
  });

  it('renders all scenario cards', () => {
    render(<ScenariosSection {...mockProps} />);
    SCENARIO_DATA.forEach(scenario => {
      expect(screen.getByText(scenario.title)).toBeInTheDocument();
    });
  });

  it('renders descriptions inside each card', () => {
    render(<ScenariosSection {...mockProps} />);
    SCENARIO_DATA.forEach(scenario => {
      scenario.descriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });
    });
  });

  it('renders with custom scenarios data', () => {
    const customScenarios = [
      {
        id: 'custom-1',
        title: 'Custom Scenario',
        image: '/custom-image.jpg',
        imageAlt: 'Custom Image',
        descriptions: ['Custom description 1', 'Custom description 2'],
      },
    ];

    render(<ScenariosSection {...mockProps} scenarios={customScenarios} />);

    expect(screen.getByText('Custom Scenario')).toBeInTheDocument();
    expect(screen.getByText('Custom description 1')).toBeInTheDocument();
    expect(screen.getByText('Custom description 2')).toBeInTheDocument();
  });
});
