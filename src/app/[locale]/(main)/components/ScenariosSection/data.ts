import { IScenarioData } from './types';

// define the configuration for each scenario
export const SCENARIO_CONFIGS = [
  {
    id: 'annual-meeting',
    image: '/assets/images/scenarios/annual-meeting.png',
    descriptionCount: 2,
  },
  {
    id: 'product-launch',
    image: '/assets/images/scenarios/product-launch.png',
    descriptionCount: 2,
  },
  {
    id: 'training-education',
    image: '/assets/images/scenarios/training-education.png',
    descriptionCount: 2,
  },
  {
    id: 'community-activities',
    image: '/assets/images/scenarios/community-activities.png',
    descriptionCount: 1,
  },
] as const;

// Function to get scenario data based on the configuration and translations
export function getScenarioData(t: (key: string) => string): IScenarioData[] {
  return SCENARIO_CONFIGS.map(config => {
    const descriptions: string[] = [];

    for (let i = 0; i < config.descriptionCount; i++) {
      descriptions.push(t(`scenarios.${config.id}.descriptions.${i}`));
    }

    return {
      id: config.id,
      title: t(`scenarios.${config.id}.title`),
      descriptions,
      image: config.image,
      imageAlt: t(`scenarios.${config.id}.imageAlt`),
    };
  });
}
