import CrossPlatformImage from '@/assets/images/FeatureImages/cross_platform.webp';
import CustomizableRulesImage from '@/assets/images/FeatureImages/customizable_rules.webp';
import DataVisualization from '@/assets/images/FeatureImages/data_visualization.webp';
import NoDownloadImage from '@/assets/images/FeatureImages/no_download.webp';

import _React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import ProductFeatureCard from './ProductFeatureCard';

const meta: Meta<typeof ProductFeatureCard> = {
  title: 'Components/ProductFeatureCard',
  component: ProductFeatureCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProductFeatureCard>;

export const DynamicDataVisualization: Story = {
  args: {
    imageUrl: DataVisualization,
    title: 'Dynamic data visualization',
    description: 'View activity data and interactions in real time',
  },
};

export const CrossPlatform: Story = {
  args: {
    imageUrl: CrossPlatformImage,
    title: 'Cross platform support',
    description: 'Support computers, mobile phones and tablets',
  },
};

export const CustomizableRules: Story = {
  args: {
    imageUrl: CustomizableRulesImage,
    title: 'High extensibility',
    description: 'Activities and rules can be customized',
  },
};

export const NoDownload: Story = {
  args: {
    imageUrl: NoDownloadImage,
    title: 'No download required',
    description: 'Scan the code to join the interaction anytime and anywhere',
  },
};
