// AuthLayout.stories.tsx
import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import AuthLayout from './AuthLayout';

const FakeForm = () => (
  <div style={{ width: '100%', textAlign: 'center' }}>
    <h1>Login Page</h1>
    <p>This is a placeholder for your login form.</p>
  </div>
);

const meta: Meta<typeof AuthLayout> = {
  title: 'auth/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <FakeForm />
    </AuthLayout>
  ),
};
