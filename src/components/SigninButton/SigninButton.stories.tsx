import type { Meta, StoryObj } from '@storybook/nextjs';

import { SigninButton } from './SigninButton';

const meta: Meta<typeof SigninButton> = {
  title: 'Components/Button/SigninButton',
  component: SigninButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A styled sign-in button with back arrow icon, positioned in the top-right corner.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClick: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The button navigates to /signin by default. You can test the navigation in the browser.',
      },
    },
  },
};
