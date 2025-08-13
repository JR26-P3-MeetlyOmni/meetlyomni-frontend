import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
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
    expect(screen.getByText('Annual meeting of the enterprise')).toBeInTheDocument();
    expect(screen.getByText('New product launch event')).toBeInTheDocument();
    expect(screen.getByText('Team training & Education')).toBeInTheDocument();
    expect(screen.getByText('Community activities')).toBeInTheDocument();
  });

  it('renders descriptions inside each card', () => {
    render(<ScenariosSection {...mockProps} />);
    expect(
      screen.getByText('Interactive quiz & Lucky draw to enhance team cohesion!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Live sweepstakes enhance interaction and let customers remember your brand!',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Gamified Q&A allows students to absorb knowledge faster and improve the training effect!',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Viewers scan the code to enter the interactive Q&A & Sweepstakes to improve live stream retention!',
      ),
    ).toBeInTheDocument();
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
