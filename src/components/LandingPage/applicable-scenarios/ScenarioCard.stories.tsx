import type { Meta, StoryObj } from '@storybook/nextjs';

import { ScenarioCardProps } from './interface';
import ScenarioCard from './ScenarioCard';

const meta: Meta<typeof ScenarioCard> = {
  title: 'LandingPage/ScenarioCard',
  component: ScenarioCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScenarioCard>;

// mock data
const mockScenario: ScenarioCardProps['scenario'] = {
  id: '1',
  title: 'Annual meeting of the enterprise',
  image: '/images/scenarios/annual-meeting.png',
  imageAlt: 'Annual meeting photo',
  descriptions: [
    'Interactive quiz & Lucky draw to enhance team cohesion!',
    'Make annual meeting is no longer a passive viewing, but full participation, hi turn full!',
  ],
};

export const Default: Story = {
  args: {
    scenario: mockScenario,
  },
};
