import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { Event } from '../../../../../constants/Event';
import EditEventModal from './EditEventModal';

const meta: Meta<typeof EditEventModal> = {
  title: 'Features/Events/EditEventModal',
  component: EditEventModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EditEventModal>;

const mockEvent: Event = {
  id: '1',
  name: 'Annual Tech Conference 2025',
  date: '2025-12-15',
  description:
    'Join us for the biggest tech conference of the year featuring keynote speakers from leading companies.',
  coverImageUrl: 'https://via.placeholder.com/640x480.png?text=Tech+Conference',
};

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Event Modal
        </Button>
        <EditEventModal
          open={open}
          event={mockEvent}
          onClose={() => setOpen(false)}
          onEventUpdated={() => {
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

export const WithoutCoverImage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const eventWithoutImage: Event = {
      ...mockEvent,
      coverImageUrl: undefined,
    };

    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Event Modal (No Image)
        </Button>
        <EditEventModal
          open={open}
          event={eventWithoutImage}
          onClose={() => setOpen(false)}
          onEventUpdated={() => {
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};

export const PreOpened: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Box>
        <EditEventModal
          open={open}
          event={mockEvent}
          onClose={() => setOpen(false)}
          onEventUpdated={() => {
            setOpen(false);
          }}
        />
      </Box>
    );
  },
};
