import type { FeatureCardItem } from '@/app/(main)/components/FeatureCard/types';
import { getAssetUrl } from '@/utils/cdn';

export const ProjectFeaturesData: readonly FeatureCardItem[] = [
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/team_manager.png'),
    title: 'Activities & Team management',
    description: 'Easily create & organize events',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/ai_matchmaking.png'),
    title: 'Intelligent match',
    description: 'The AI recommends the best team/opponent',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/game_interaction.png'),
    title: 'Game interaction',
    description: 'A variety of games, Q&A and sweepstakes',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/data_analysis.png'),
    title: 'Data analysis',
    description: 'Real-time data statistics activities, participants',
  },
];

export const ProductFeaturesData: readonly FeatureCardItem[] = [
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/data_visualization.png'),
    title: 'Dynamic data visualization',
    description: 'View activity data and interactions in real time',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/cross_platform.png'),
    title: 'Cross platform support',
    description: 'Support computers, mobile phones and tablets',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/customizable_rules.png'),
    title: 'High extensibility',
    description: 'Activities and rules can be customized',
  },
  {
    imageUrl: getAssetUrl('StaticFiles/assets/images/FeatureImages/no_download.png'),
    title: 'No download required',
    description: 'Scan the code to join the interaction anytime and anywhere',
  },
];
