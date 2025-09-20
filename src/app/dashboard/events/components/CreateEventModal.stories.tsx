import React, { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { CreateEventResponse } from '../../../../constants/Event';
import CreateEventModal from './CreateEventModal';

const meta: Meta<typeof CreateEventModal> = {
  title: 'Features/Events/CreateEventModal',
  component: CreateEventModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CreateEventModal>;

export const Default: Story = {
  args: {
    open: true,
  },
};

export const WithLocalState: Story = {
  render: args => {
    const [open, setOpen] = useState(false);
    const [lastEvent, setLastEvent] = useState<CreateEventResponse | null>(null);

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const handleEventCreated = useCallback((data: CreateEventResponse) => {
      setLastEvent(data);
      setOpen(false);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button onClick={handleOpen}>Open Modal</button>
        <CreateEventModal
          {...args}
          open={open}
          onClose={handleClose}
          onEventCreated={handleEventCreated}
        />
        {lastEvent ? (
          <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <strong>Last Created Event:</strong>
            <pre>{JSON.stringify(lastEvent, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    );
  },
};
