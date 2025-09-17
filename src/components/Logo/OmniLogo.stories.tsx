import type { Meta, StoryObj } from '@storybook/nextjs';

import { TopLeftLogo } from './OmniLogo';

const meta: Meta<typeof TopLeftLogo> = {
  title: 'Components/Logo/OmniLogo',
  component: TopLeftLogo,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'The MeetlyOmni logo component positioned in the top-left corner. Clicking it navigates to the home page.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      control: false,
      description: 'Optional custom click handler. If not provided, navigates to home page.',
    },
  },
  decorators: [
    Story => (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClick: Story = {
  args: {
    onClick: () => {
      alert('Custom click handler triggered!');
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a custom click handler that shows an alert instead of navigating.',
      },
    },
  },
};
