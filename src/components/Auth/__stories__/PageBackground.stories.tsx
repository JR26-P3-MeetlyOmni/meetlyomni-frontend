import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { PageBackground } from '../PageBackground';

const meta: Meta<typeof PageBackground> = {
  title: 'Auth/PageBackground',
  component: PageBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'PageBackground component provides the common background layout for authentication pages with decorative elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageBackground>;

export const Default: Story = {
  render: () => (
    <PageBackground>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <h2>Authentication Form</h2>
        <p>This is where your form content would go</p>
      </div>
    </PageBackground>
  ),
};

export const WithFormContent: Story = {
  render: () => (
    <PageBackground>
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          minWidth: '320px',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </div>
    </PageBackground>
  ),
};

export const EmptyBackground: Story = {
  render: () => <PageBackground />,
  parameters: {
    docs: {
      description: {
        story: 'PageBackground without any children content, showing only the decorative elements.',
      },
    },
  },
};
