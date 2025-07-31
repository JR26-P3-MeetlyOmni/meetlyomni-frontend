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

// export const TeamManager: Story = {
//   args: {
//     data: [FeatureCardGridConstants.TeamManager],
//     type: 'project',
//   },
// };

// export const IntelligentMatch: Story = {
//   args: {
//     data: [FeatureCardGridConstants.IntelligentMatch],
//     type: 'project',
//   },
// };

// export const GameInteraction: Story = {
//   args: {
//     data: [FeatureCardGridConstants.GameInteraction],
//     type: 'project',
//   },
// };

// export const DataAnalysis: Story = {
//   args: {
//     data: [FeatureCardGridConstants.DataAnalysis],
//     type: 'project',
//   },
// };

// export const DataVisualization: Story = {
//   args: {
//     data: [FeatureCardGridConstants.DataVisualization],
//     type: 'product',
//   },
// };

// export const CrossPlatform: Story = {
//   args: {
//     data: [FeatureCardGridConstants.CrossPlatform],
//     type: 'product',
//   },
// };

// export const CustomizableRules: Story = {
//   args: {
//     data: [FeatureCardGridConstants.CustomizableRules],
//     type: 'product',
//   },
// };

// export const NoDownload: Story = {
//   args: {
//     data: [FeatureCardGridConstants.NoDownload],
//     type: 'product',
//   },
// };
