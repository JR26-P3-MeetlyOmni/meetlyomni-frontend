import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { Meta, StoryObj } from '@storybook/nextjs';

import EventCard from './EventCard';
import type { EventItem } from './eventMocks';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(3),
}));

const meta: Meta<typeof EventCard> = {
  title: 'Features/Events/EventCard',
  component: EventCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventCard>;

const mockEvent: EventItem = {
  id: '1',
  title: 'Annual Tech Conference 2025',
  description:
    'Join us for the biggest tech conference of the year featuring keynote speakers from leading companies.',
  coverImageUrl: 'https://via.placeholder.com/640x480.png?text=Tech+Conference',
  creator: { name: 'Alex Li', avatarUrl: '/assets/images/navbar/user_avatar.png' },
  playCount: 5,
  isDraft: false,
  createdAt: '2025-10-01T10:00:00Z',
};

export const Default: Story = {
  args: {
    event: mockEvent,
  },
};

export const WithoutCoverImage: Story = {
  args: {
    event: {
      ...mockEvent,
      coverImageUrl: undefined,
    },
  },
};

export const LongDescription: Story = {
  args: {
    event: {
      ...mockEvent,
      description:
        'This is a much longer description to demonstrate how the card handles text overflow. Join us for the biggest tech conference of the year featuring keynote speakers from leading companies, interactive workshops, networking sessions, and much more. This event will cover topics including AI, machine learning, cloud computing, and the future of technology.',
    },
  },
};

export const MultipleCards: Story = {
  render: () => {
    const events: EventItem[] = [
      mockEvent,
      {
        id: '2',
        title: 'Product Launch Event',
        description: 'Launching our newest product line with exclusive previews.',
        coverImageUrl: 'https://via.placeholder.com/640x480.png?text=Product+Launch',
        creator: { name: 'Sarah Johnson' },
        playCount: 3,
        isDraft: false,
        createdAt: '2025-10-02T10:00:00Z',
      },
      {
        id: '3',
        title: 'Team Building Workshop',
        description: 'A fun day of team activities and collaboration exercises.',
        creator: { name: 'Mike Chen' },
        playCount: 1,
        isDraft: true,
        createdAt: '2025-10-03T10:00:00Z',
      },
    ];

    return (
      <GridContainer>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </GridContainer>
    );
  },
};
