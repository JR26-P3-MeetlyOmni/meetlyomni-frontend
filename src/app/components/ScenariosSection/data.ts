import { ScenarioData } from './types';

// Hardcoded scenario data in English
export const SCENARIO_DATA: ScenarioData[] = [
  {
    id: 'annual-meeting',
    title: 'Annual meeting of the enterprise',
    descriptions: [
      'Interactive quiz & Lucky draw to enhance team cohesion!',
      'Make annual meeting is no longer a passive viewing, but full participation, hi turn full!'
    ],
    image: '/assets/images/scenarios/annual-meeting.png',
    imageAlt: 'Annual meeting with large screen displays and audience',
  },
  {
    id: 'product-launch',
    title: 'New product launch event',
    descriptions: [
      'Game quiz allows students to absorb knowledge faster and improve the training effect!',
      'Live sweepstakes enhance interaction and let customers remember your brand!'
    ],
    image: '/assets/images/scenarios/product-launch.png',
    imageAlt: 'Product launch event with purple lighting and audience',
  },
  {
    id: 'training-education',
    title: 'Team training & Education',
    descriptions: [
      'Gamified Q&A allows students to absorb knowledge faster and improve the training effect!',
      'Suitable for corporate training, school classes, etc.!'
    ],
    image: '/assets/images/scenarios/training-education.png',
    imageAlt: 'Training session with instructor and students in classroom',
  },
  {
    id: 'community-activities',
    title: 'Community activities',
    descriptions: [
      'Viewers scan the code to enter the interactive Q&A & Sweepstakes to improve live stream retention!'
    ],
    image: '/assets/images/scenarios/community-activities.png',
    imageAlt: 'Community gathering with people socializing',
  },
];

// Function to get scenario data (no longer needs translation function)
export function getScenarioData(): ScenarioData[] {
  return SCENARIO_DATA;
}
