import type { Meta, StoryObj } from '@storybook/nextjs';

import DashboardPage from './page';

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The main dashboard page featuring event management functionality with interactive quiz and raffle game options.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state - empty dashboard
export const Default: Story = {
  args: {},
};

// Mobile view
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Tablet view
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Desktop view
export const DesktopView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// Wide screen view for better content visibility
export const WideScreenView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

// Dark mode view (if theme supports it)
export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
