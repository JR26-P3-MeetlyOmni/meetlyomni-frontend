import { MUIProvider } from '@/components/Providers/MUIProvider';
import { ReduxProvider } from '@/store/provider';

import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import EventManagement from './EventManagement';

const withAppProviders = (Story: React.ComponentType) => (
  <ReduxProvider>
    <MUIProvider>
      <Story />
    </MUIProvider>
  </ReduxProvider>
);

const meta: Meta<typeof EventManagement> = {
  title: 'Dashboard/EventManagement/Page',
  component: EventManagement,
  decorators: [withAppProviders],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'UI-only demo for Event Management — includes Delete Event (UI) and Tab Switching between Interactive Quiz / Raffle Game. Wrapped with Redux + MUI providers.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
