import type { Meta, StoryObj } from '@storybook/nextjs';

import ResetPasswordForm from './ResetPasswordForm';

const noop = () => {};
const noopAsync = async () => {};

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Auth/ResetPassword/ResetPasswordForm',
  component: ResetPasswordForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/reset-password',
        query: { token: 'storybook-token' },
        push: noop,
        replace: noop,
        prefetch: noopAsync,
        refresh: noop,
      },
    },
  },
  args: {
    token: 'storybook-token',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
