import { ScenarioData } from './interface';

<<<<<<< HEAD
// define the configuration for each scenario
export const SCENARIO_CONFIGS = [
  {
    id: 'annual-meeting',
    image: '/assets/images/scenarios/annual-meeting.png',
  },
  {
    id: 'product-launch',
    image: '/assets/images/scenarios/product-launch.png',
  },
  {
    id: 'training-education',
    image: '/assets/images/scenarios/training-education.png',
  },
  {
    id: 'community-activities',
    image: '/assets/images/scenarios/community-activities.png',
  },
] as const;

// Function to get scenario data based on the configuration and translations
=======
// 定义场景的配置，只包含非文本数据
export const SCENARIO_CONFIGS = [
  {
    id: 'annual-meeting',
    image: '/images/scenarios/annual-meeting.png',
  },
  {
    id: 'product-launch',
    image: '/images/scenarios/product-launch.png',
  },
  {
    id: 'training-education',
    image: '/images/scenarios/training-education.png',
  },
  {
    id: 'community-activities',
    image: '/images/scenarios/community-activities.png',
  },
] as const;

// 这个函数将在组件中使用，结合翻译数据
>>>>>>> 0bc462f (refactor:change all emotion style to mui style)
export function getScenarioData(t: (key: string) => string): ScenarioData[] {
  return SCENARIO_CONFIGS.map(config => ({
    id: config.id,
    title: t(`scenarios.${config.id}.title`),
    descriptions: [
      t(`scenarios.${config.id}.descriptions.0`),
      t(`scenarios.${config.id}.descriptions.1`),
    ],
    image: config.image,
    imageAlt: t(`scenarios.${config.id}.imageAlt`),
  }));
}
