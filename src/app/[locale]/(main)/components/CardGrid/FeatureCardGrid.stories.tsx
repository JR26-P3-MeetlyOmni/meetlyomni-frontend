import _React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Feature_Card_Grid } from '../constants/FeatureCardGridConstants';
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
      Feature_Card_Grid.TeamManager,
      Feature_Card_Grid.IntelligentMatch,
      Feature_Card_Grid.GameInteraction,
      Feature_Card_Grid.DataAnalysis,
    ],
    type: 'project',
  },
};
export const ProductFeature: Story = {
  name: 'Product',
  args: {
    data: [
      Feature_Card_Grid.DataVisualization,
      Feature_Card_Grid.CrossPlatform,
      Feature_Card_Grid.CustomizableRules,
      Feature_Card_Grid.NoDownload,
    ],
    type: 'product',
  },
};
