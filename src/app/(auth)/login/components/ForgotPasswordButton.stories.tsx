import type { Meta, StoryObj } from '@storybook/nextjs';

import ForgotPasswordButton from './ForgotPasswordButton';

const meta: Meta<typeof ForgotPasswordButton> = {
  title: 'Auth/Login/ForgotPasswordButton',
  component: ForgotPasswordButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The “Forgot password?” button entry at the bottom left of the Login page.',
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
