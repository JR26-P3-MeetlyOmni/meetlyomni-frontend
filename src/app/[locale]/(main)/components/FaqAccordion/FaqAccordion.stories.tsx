import { NextIntlClientProvider } from 'next-intl';

import type { Meta, StoryObj } from '@storybook/nextjs';

import FaqAccordion from './FaqAccordion';
import { FaqItem } from './interface';

// Mock messages for Storybook
const mockMessages = {
  LandingPage: {
    faq: {
      title: 'Frequently Asked Questions',
      questions: {
        free: {
          question: 'Is Meetly Omni free?',
          answer:
            'We offer a free trial, with more advanced features available in the enterprise edition.',
        },
        'create-activity': {
          question: 'How to create an activity?',
          answer:
            'Register and create a user first, and then enter the activity centre to create the corresponding activity.',
        },
        'download-app': {
          question: 'Is it necessary to download the application?',
          answer:
            'There is no need to download, and the audience can participate by simply scanning the code or entering the activity code.',
        },
        'supported-devices': {
          question: 'What devices are supported?',
          answer:
            'It can be used on computers, mobile phones and tablets, compatible with major browsers.',
        },
      },
    },
  },
};

// Meta configuration for the component
const meta: Meta<typeof FaqAccordion> = {
  title: 'Components/FaqAccordion',
  component: FaqAccordion,
  parameters: {
    layout: 'fullscreen', // Full screen layout for better visualization
  },
  decorators: [
    // Wrap stories with NextIntlClientProvider for internationalization
    Story => (
      <NextIntlClientProvider messages={mockMessages} locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'], // Enable automatic documentation generation
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with default props
export const Default: Story = {
  args: {},
};

// Story with custom title
export const WithCustomTitle: Story = {
  args: {
    title: 'Custom FAQ Title',
  },
};

// Story with custom FAQ items
export const WithCustomFaqItems: Story = {
  args: {
    faqItems: [
      {
        id: 'custom-1',
        question: 'Custom Question 1?',
        answer: 'This is a custom answer for the first question.',
      },
      {
        id: 'custom-2',
        question: 'Custom Question 2?',
        answer: 'This is a custom answer for the second question.',
      },
    ] as FaqItem[],
  },
};

// Story with empty FAQ items
export const Empty: Story = {
  args: {
    faqItems: [],
  },
};
