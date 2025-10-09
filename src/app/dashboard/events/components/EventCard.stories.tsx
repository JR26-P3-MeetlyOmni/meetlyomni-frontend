import type { Meta, StoryObj } from '@storybook/nextjs';

import EventCard from './EventCard';
import { initialMockEvents } from './eventMocks';
import { normalizeEventForStory } from './eventUtils';

const meta: Meta<typeof EventCard> = {
  title: 'Dashboard/Events/EventCard',
  component: EventCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    event: normalizeEventForStory(initialMockEvents[0] ?? {}, 'default-id'),
  },
};

export const Draft: Story = {
  args: {
    event: normalizeEventForStory({ ...(initialMockEvents[1] ?? {}), isDraft: true }, 'draft-id'),
  },
};

export const LongText: Story = {
  args: {
    event: normalizeEventForStory(
      {
        ...(initialMockEvents[2] ?? {}),
        title: 'This is a very long event title that should truncate neatly',
        description:
          'This description is intentionally long to demonstrate multi-line truncation behavior within the card layout. The text should not overflow the container.',
      },
      'longtext-id',
    ),
  },
};
