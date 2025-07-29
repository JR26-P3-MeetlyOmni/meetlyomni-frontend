import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { ScenariosSectionProps } from './interface';
import ScenariosSection from './ScenarioSection';

// Mock translation messages with all the keys the component needs
const messages = {
  LandingPage: {
    scenarios: {
      title: 'Test Scenarios',
      'annual-meeting': {
        title: 'Annual Meeting',
        descriptions: {
          '0': 'Host large-scale annual meetings',
          '1': 'Perfect for corporate events',
        },
        imageAlt: 'Annual Meeting Scenario',
      },
      'product-launch': {
        title: 'Product Launch',
        descriptions: {
          '0': 'Launch new products effectively',
          '1': 'Engage with stakeholders',
        },
        imageAlt: 'Product Launch Scenario',
      },
      'training-education': {
        title: 'Training & Education',
        descriptions: {
          '0': 'Conduct training sessions',
          '1': 'Educational workshops',
        },
        imageAlt: 'Training Education Scenario',
      },
      'community-activities': {
        title: 'Community Activities',
        descriptions: {
          '0': 'Community engagement',
          '1': 'Social events',
        },
        imageAlt: 'Community Activities Scenario',
      },
    },
  },
};

// Helper function to render with translation provider
const renderWithTranslations = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider messages={messages} locale="en">
      {component}
    </NextIntlClientProvider>,
  );
};

describe('ScenariosSection', () => {
  const mockProps: ScenariosSectionProps = {
    title: 'Test Scenarios',
    className: '',
  };

  it('renders title correctly', () => {
    renderWithTranslations(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Test Scenarios')).toBeInTheDocument();
  });

  it('renders all scenario cards', () => {
    renderWithTranslations(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Annual Meeting')).toBeInTheDocument();
    expect(screen.getByText('Product Launch')).toBeInTheDocument();
    expect(screen.getByText('Training & Education')).toBeInTheDocument();
    expect(screen.getByText('Community Activities')).toBeInTheDocument();
  });

  it('renders descriptions inside each card', () => {
    renderWithTranslations(<ScenariosSection {...mockProps} />);
    expect(screen.getByText('Host large-scale annual meetings')).toBeInTheDocument();
    expect(screen.getByText('Launch new products effectively')).toBeInTheDocument();
    expect(screen.getByText('Conduct training sessions')).toBeInTheDocument();
    expect(screen.getByText('Community engagement')).toBeInTheDocument();
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

    renderWithTranslations(<ScenariosSection {...mockProps} scenarios={customScenarios} />);

    expect(screen.getByText('Custom Scenario')).toBeInTheDocument();
    expect(screen.getByText('Custom description 1')).toBeInTheDocument();
    expect(screen.getByText('Custom description 2')).toBeInTheDocument();
  });
});
