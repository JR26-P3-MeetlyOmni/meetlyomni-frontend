// src/app/(auth)/forgot-password/components/RequestResetEmailForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';

import RequestResetEmailForm from './RequestResetEmailForm';

const noop = () => {};
const noopAsync = async () => {};

const meta: Meta<typeof RequestResetEmailForm> = {
  title: 'Auth/ForgotPassword/RequestResetEmailForm',
  component: RequestResetEmailForm,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/forgot-password',
        query: {},
        push: noop, // 提交后会调用的 push，给个空实现即可
        replace: noop,
        prefetch: noopAsync,
        refresh: noop,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
