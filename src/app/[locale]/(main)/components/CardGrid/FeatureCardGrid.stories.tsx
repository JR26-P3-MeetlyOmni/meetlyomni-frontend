import _React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { FeatureCardGridConstants } from '../constants/FeatureCardGridConstants';
import FeatureCardGrid from './FeatureCardGrid';

const meta: Meta<typeof FeatureCardGrid> = {
  title: 'Components/FeatureCardGrid',
  component: FeatureCardGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCardGrid>;

export const ProjectFeature: Story = {
  name: 'Project',
  args: {
    data: [
      FeatureCardGridConstants.TeamManager,
      FeatureCardGridConstants.IntelligentMatch,
      FeatureCardGridConstants.GameInteraction,
      FeatureCardGridConstants.DataAnalysis,
    ],
    type: 'project',
  },
};
export const ProductFeature: Story = {
  name: 'Product',
  args: {
    data: [
      FeatureCardGridConstants.DataVisualization,
      FeatureCardGridConstants.CrossPlatform,
      FeatureCardGridConstants.CustomizableRules,
      FeatureCardGridConstants.NoDownload,
    ],
    type: 'product',
  },
};
