import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import FeatureCard from './FeatureCard';

const meta: Meta<typeof FeatureCard> = {
  title: 'LandingPage/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  render: () => <FeatureCard />,
};