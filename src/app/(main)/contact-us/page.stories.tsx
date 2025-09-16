import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ContactUsPage from './page';

const meta: Meta<typeof ContactUsPage> = {
  title: 'Pages/ContactUs',
  component: ContactUsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Contact form with validation and responsive design.`,
      },
    },
  },
} satisfies Meta<typeof ContactUsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default contact form view.',
      },
    },
  },
};

export const WithPrefilledData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Visual reference for user interaction.',
      },
    },
  },
  play: async ({ canvasElement: _canvasElement }) => {
    // Note: Since this is a page component with internal state,
    // we can't easily prefill data through args.
    // In a real scenario, you might want to extract the form
    // into a separate component for better story control.
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Contact Us page optimized for mobile devices. The form layout adapts to smaller screens.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Contact Us page on tablet devices. Shows the responsive design in action.',
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Contact Us page on desktop with full width layout and optimal spacing.',
      },
    },
  },
};
