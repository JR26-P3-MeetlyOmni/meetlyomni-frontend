import type { Meta, StoryObj } from '@storybook/nextjs';

import EventCard from './EventCard';
import { type EventItem, initialMockEvents } from './eventMocks';

const meta: Meta<typeof EventCard> = {
  title: 'Dashboard/Events/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const normalize = (e: Partial<EventItem>, fallbackId: string): EventItem => ({
  id: e.id ?? fallbackId,
  title: e.title ?? 'Untitled event',
  description: e.description ?? '',
  coverImageUrl: e.coverImageUrl,
  creator: e.creator ?? { name: 'Alex Li', avatarUrl: '/assets/images/navbar/user_avatar.png' },
  playCount: e.playCount ?? 0,
  isDraft: e.isDraft ?? false,
  createdAt: e.createdAt ?? new Date().toISOString(),
});

export const Default: Story = {
  args: {
    event: normalize(initialMockEvents[0] as Partial<EventItem>, 'eventcard-default'),
  },
};

export const Draft: Story = {
  args: {
    event: normalize(
      { ...(initialMockEvents[1] as Partial<EventItem>), isDraft: true },
      'eventcard-draft',
    ),
  },
};

export const LongText: Story = {
  args: {
    event: normalize(
      {
        ...(initialMockEvents[2] as Partial<EventItem>),
        title: 'This is a very long event title that should truncate neatly',
        description:
          'This description is intentionally long to demonstrate multi-line truncation behavior within the card layout. The text should not overflow the container.',
      },
      'eventcard-longtext',
    ),
  },
};
