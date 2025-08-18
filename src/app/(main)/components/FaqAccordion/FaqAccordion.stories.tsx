import type { Meta, StoryObj } from '@storybook/nextjs';

import FaqAccordion from './FaqAccordion';
import { FaqItem } from './types';

// Meta configuration for the component
const meta: Meta<typeof FaqAccordion> = {
  title: 'Components/FaqAccordion',
  component: FaqAccordion,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with default props
export const Default: Story = {
  args: {},
};

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
