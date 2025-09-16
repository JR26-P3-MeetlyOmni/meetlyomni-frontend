import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import HeroSection from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'LandingPage/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {},
  parameters: {},
};
