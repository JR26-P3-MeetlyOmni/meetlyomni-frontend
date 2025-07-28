import _React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import AiMatchmaking from '../../assets/images/FeatureImages/ai_matchmaking.webp';
import DataAnalysisImage from '../../assets/images/FeatureImages/data_analysis.webp';
import GameInteractionImage from '../../assets/images/FeatureImages/game_interaction.webp';
import TeamManagerImage from '../../assets/images/FeatureImages/team_ manager.webp';
import ProjectFeatures from './ProjectFeatureCard';

const meta: Meta<typeof ProjectFeatures> = {
  title: 'Components/ProductFeatureCard',
  component: ProjectFeatures,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ProjectFeatures>;

export const TeamManager: Story = {
  args: {
    imageUrl: TeamManagerImage,
    title: 'Activities & Team management',
    description: 'Easily create & organize events',
  },
};

export const IntelligentMatch: Story = {
  args: {
    imageUrl: AiMatchmaking,
    title: 'Intelligent Match',
    description: 'The AI recommends the best team/opponent',
  },
};

export const GameInteraction: Story = {
  args: {
    imageUrl: GameInteractionImage,
    title: 'Game Interaction',
    description: 'A variety of games, Q&A and sweepstakes',
  },
};

export const DataAnalysis: Story = {
  args: {
    imageUrl: DataAnalysisImage,
    title: 'Data analysis',
    description: 'Real-time data statistics activities, participants',
  },
};
