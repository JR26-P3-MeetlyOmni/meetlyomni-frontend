import type { Meta, StoryObj } from '@storybook/nextjs';

import SigninPage from './page';

const meta: Meta<typeof SigninPage> = {
  title: 'Pages/SigninPage',
  component: SigninPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive sign-in page for the Omni platform with form validation, responsive design, and decorative elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default state - empty form
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
