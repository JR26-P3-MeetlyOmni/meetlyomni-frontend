// src/app/(auth)/reset-password/components/ResetPasswordForm.stories.tsx
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
      appDirectory: true, // 告诉 SB 这是 App Router 组件
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
    token: 'storybook-token', // 真实页面来自 ?token=...，这里用 args 注入
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
