import { describe, expect, test } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import mockImage from './mocks/mockImage';
import ProjectFeatureCard from './ProjectFeatureCard';

describe('ProjectFeatureCard', () => {
  test('renders title, description, and image correctly', () => {
    render(
      <ProjectFeatureCard
        imageUrl={mockImage}
        title="AI integration"
        description="Enhance your workflow with smart AI tools"
      />,
    );

    expect(screen.getByText('AI integration')).toBeInTheDocument();
    expect(screen.getByText('Enhance your workflow with smart AI tools')).toBeInTheDocument();

    const image = screen.getByAltText('AI integration feature illustration');
    expect(image).toBeInTheDocument();
  });
});
