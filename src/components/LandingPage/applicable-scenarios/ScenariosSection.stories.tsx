import type { Meta, StoryObj } from '@storybook/nextjs';

import type { ScenariosSectionProps } from './interface';
import ScenariosSection from './ScenariosSection';

const meta: Meta<typeof ScenariosSection> = {
  title: 'LandingPage/ScenariosSection',
  component: ScenariosSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScenariosSection>;

// mock data
const mockScenarios: ScenariosSectionProps['scenarios'] = [
  {
    id: '1',
    title: 'Annual meeting of the enterprise',
    image: '/images/scenarios/annual-meeting.png',
    imageAlt: 'Annual meeting photo',
    descriptions: [
      'Interactive quiz & Lucky draw to enhance team cohesion!',
      'Make annual meeting is no longer a passive viewing, but full participation, hi turn full!',
    ],
  },
  {
    id: '2',
    title: 'New product launch event',
    image: '/images/scenarios/product-launch.png',
    imageAlt: 'Launch event photo',
    descriptions: ['Live sweepstakes enhance interaction.', 'Let customers remember your brand!'],
  },
  {
    id: '3',
    title: 'Annual meeting of the enterprise',
    image: '/images/scenarios/annual-meeting.png',
    imageAlt: 'Annual meeting photo',
    descriptions: [
      'Interactive quiz & Lucky draw to enhance team cohesion!',
      'Make annual meeting is no longer a passive viewing, but full participation, hi turn full!',
    ],
  },
  {
    id: '4',
    title: 'New product launch event',
    image: '/images/scenarios/product-launch.png',
    imageAlt: 'Launch event photo',
    descriptions: ['Live sweepstakes enhance interaction.', 'Let customers remember your brand!'],
  },
];

export const Default: Story = {
  args: {
    scenarios: mockScenarios,
    title: 'Applicable Scenarios',
  },
};
