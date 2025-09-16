import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'LandingPage/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  render: () => <NavBar />,
};
