import type { Meta, StoryObj } from '@storybook/nextjs';

import EventList from './EventList';
import { initialMockEvents } from './eventMocks';

const meta: Meta<typeof EventList> = {
  title: 'Dashboard/Events/EventList',
  component: EventList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEvents: Story = {
  args: {
    events: initialMockEvents,
    onCreateClick: () => alert('Create clicked'),
  },
};

export const Empty: Story = {
  args: {
    events: [],
    onCreateClick: () => alert('Create clicked'),
  },
};
