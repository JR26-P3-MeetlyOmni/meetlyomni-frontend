import AiMatchmaking from '@assets/images/FeatureImages/ai_matchmaking.webp';
import CrossPlatformImage from '@assets/images/FeatureImages/cross_platform.webp';
import CustomizableRulesImage from '@assets/images/FeatureImages/customizable_rules.webp';
import DataAnalysisImage from '@assets/images/FeatureImages/data_analysis.webp';
import DataVisualization from '@assets/images/FeatureImages/data_visualization.webp';
import GameInteractionImage from '@assets/images/FeatureImages/game_interaction.webp';
import NoDownloadImage from '@assets/images/FeatureImages/no_download.webp';
import TeamManagerImage from '@assets/images/FeatureImages/team_ manager.webp';
import type { Meta, StoryObj } from '@storybook/nextjs';

import FeatureCardGrid from './FeatureCardGrid';
import { FeatureCardGridProps } from './FeatureCardGrid';

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

const projectFeature: FeatureCardGridProps = {
  data: [
    {
      imageUrl: TeamManagerImage,
      title: 'Activities & Team management',
      desc: 'Easily create & organize events',
    },
    {
      imageUrl: AiMatchmaking,
      title: 'Intelligent Match',
      desc: 'The AI recommends the best team/opponent',
    },
    {
      imageUrl: GameInteractionImage,
      title: 'Game Interaction',
      desc: 'A variety of games, Q&A and sweepstakes',
    },
    {
      imageUrl: DataAnalysisImage,
      title: 'Data analysis',
      desc: 'Real-time data statistics activities, participants',
    },
  ],
  type: 'project',
};

export const ProductType: Story = {
  args: projectFeature,
};

const productFeature: FeatureCardGridProps = {
  data: [
    {
      imageUrl: DataVisualization,
      title: 'Dynamic data visualization',
      desc: 'View activity data and interactions in real time',
    },
    {
      imageUrl: CrossPlatformImage,
      title: 'Cross platform support',
      desc: 'Support computers, mobile phones and tablets',
    },
    {
      imageUrl: CustomizableRulesImage,
      title: 'High extensibility',
      desc: 'Activities and rules can be customized',
    },
    {
      imageUrl: NoDownloadImage,
      title: 'No download required',
      desc: 'Scan the code to join the interaction anytime and anywhere',
    },
  ],
  type: 'product',
};

export const ProjectType: Story = {
  args: productFeature,
};
