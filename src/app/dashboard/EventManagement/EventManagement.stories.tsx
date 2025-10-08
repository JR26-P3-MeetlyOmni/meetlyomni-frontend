import type { Meta, StoryObj } from '@storybook/nextjs';

import EventManagement from './EventManagement';

const meta: Meta<typeof EventManagement> = {
  title: 'Dashboard/EventManagement/Page',
  component: EventManagement,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
