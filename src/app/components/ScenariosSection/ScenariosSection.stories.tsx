import type { Meta, StoryObj } from '@storybook/nextjs';

import ScenariosSection from './ScenarioSection';

const meta: Meta<typeof ScenariosSection> = {
  title: 'LandingPage/ScenariosSection',
  component: ScenariosSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
          ScenariosSection component displays various applicable scenarios for the Meetly Omni platform.
          Features:
          - Responsive grid layout
          - Scenario cards with images and descriptions
          - Customizable title and scenarios data
          - Mobile-first design approach
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Custom title for the scenarios section',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ScenariosSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default ScenariosSection with hardcoded English content showing all four scenarios.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Our Use Cases',
  },
  parameters: {
    docs: {
      description: {
        story: 'ScenariosSection with a custom title.',
      },
    },
  },
};

export const CustomScenarios: Story = {
  args: {
    title: 'Custom Scenarios',
    scenarios: [
      {
        id: 'custom-1',
        title: 'Workshop Events',
        descriptions: [
          'Interactive workshops for skill development',
          'Hands-on learning experiences',
        ],
        image: '/assets/images/scenarios/annual-meeting.png',
        imageAlt: 'Workshop event with participants',
      },
      {
        id: 'custom-2',
        title: 'Virtual Meetings',
        descriptions: [
          'Remote collaboration made easy',
        ],
        image: '/assets/images/scenarios/product-launch.png',
        imageAlt: 'Virtual meeting setup',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'ScenariosSection with custom scenarios data to demonstrate flexibility.',
      },
    },
  },
};