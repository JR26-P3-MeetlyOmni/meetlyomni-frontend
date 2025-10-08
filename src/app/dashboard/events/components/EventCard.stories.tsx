import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Event } from '../../../../constants/Event';
import EventCard from './EventCard';

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

const mockEvent: Event = {
  id: '1',
  name: 'Annual Tech Conference 2025',
  date: '2025-12-15',
  description:
    'Join us for the biggest tech conference of the year featuring keynote speakers from leading companies.',
  coverImageUrl: 'https://via.placeholder.com/640x480.png?text=Tech+Conference',
  status: 1,
  createdAt: '2025-10-01T10:00:00Z',
  updatedAt: '2025-10-01T10:00:00Z',
};

export const Default: Story = {
  args: {
    event: mockEvent,
    onEdit: () => {},
  },
};

export const WithoutCoverImage: Story = {
  args: {
    event: {
      ...mockEvent,
      coverImageUrl: undefined,
    },
    onEdit: () => {},
  },
};

export const LongDescription: Story = {
  args: {
    event: {
      ...mockEvent,
      description:
        'This is a much longer description to demonstrate how the card handles text overflow. Join us for the biggest tech conference of the year featuring keynote speakers from leading companies, interactive workshops, networking sessions, and much more. This event will cover topics including AI, machine learning, cloud computing, and the future of technology.',
    },
    onEdit: () => {},
  },
};

export const MultipleCards: Story = {
  render: () => {
    const events: Event[] = [
      mockEvent,
      {
        id: '2',
        name: 'Product Launch Event',
        date: '2025-11-20',
        description: 'Launching our newest product line with exclusive previews.',
        coverImageUrl: 'https://via.placeholder.com/640x480.png?text=Product+Launch',
        status: 1,
        createdAt: '2025-10-02T10:00:00Z',
        updatedAt: '2025-10-02T10:00:00Z',
      },
      {
        id: '3',
        name: 'Team Building Workshop',
        date: '2025-10-05',
        description: 'A fun day of team activities and collaboration exercises.',
        status: 1,
        createdAt: '2025-10-03T10:00:00Z',
        updatedAt: '2025-10-03T10:00:00Z',
      },
    ];

    return (
      <GridContainer>
        {events.map(event => (
          <EventCard key={event.id} event={event} onEdit={() => {}} />
        ))}
      </GridContainer>
    );
  },
};
