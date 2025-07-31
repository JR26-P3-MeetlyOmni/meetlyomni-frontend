// Branding.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import Branding from './Branding';

const meta: Meta<typeof Branding> = {
  title: 'auth/Branding',
  component: Branding,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Branding>;

export const Default: Story = {
  args: {},
};
