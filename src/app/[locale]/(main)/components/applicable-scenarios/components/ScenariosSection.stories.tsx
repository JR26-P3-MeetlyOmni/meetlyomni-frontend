import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

// Import translation messages for different locales
import enMessages from '../../../../../../../messages/en.json';
import zhMessages from '../../../../../../../messages/zh.json';
import type { ScenariosSectionProps } from './interface';
import ScenariosSection from './ScenarioSection';

// Create a decorator to provide translations based on locale
const createTranslationDecorator = (locale: 'en' | 'zh' = 'en') => {
  const messages = locale === 'en' ? enMessages : zhMessages;

  const TranslationDecorator = (Story: React.ComponentType) => (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Story />
    </NextIntlClientProvider>
  );

  TranslationDecorator.displayName = `TranslationDecorator(${locale})`;

  return TranslationDecorator;
};

const meta: Meta<typeof ScenariosSection> = {
  title: 'LandingPage/ScenariosSection',
  component: ScenariosSection,
  tags: ['autodocs'],
  // Add decorators to provide translations for the stories
  decorators: [createTranslationDecorator('en')],
};

export default meta;
type Story = StoryObj<typeof ScenariosSection>;

// mock data
const mockScenarios: ScenariosSectionProps['scenarios'] = [
  {
    id: '1',
    title: 'Annual meeting of the enterprise',
    image: '/assets/images/scenarios/annual-meeting.png',
    imageAlt: 'Annual meeting photo',
    descriptions: [
      'Interactive quiz & Lucky draw to enhance team cohesion!',
      'Make annual meeting is no longer a passive viewing, but full participation, hi turn full!',
    ],
  },
  {
    id: '2',
    title: 'New product launch event',
    image: '/assets/images/scenarios/product-launch.png',
    imageAlt: 'Launch event photo',
    descriptions: ['Live sweepstakes enhance interaction.', 'Let customers remember your brand!'],
  },
  {
    id: '3',
    title: 'Training & Education',
    image: '/assets/images/scenarios/training-education.png',
    imageAlt: 'Training photo',
    descriptions: [
      'Interactive learning sessions',
      'Engage students with live quizzes and rewards',
    ],
  },
  {
    id: '4',
    title: 'Community Activities',
    image: '/assets/images/scenarios/community-activities.png',
    imageAlt: 'Community photo',
    descriptions: ['Build community engagement', 'Create memorable social events'],
  },
];

export const Default: Story = {
  args: {
    title: 'Applicable Scenarios',
    scenarios: mockScenarios,
  },
};

export const WithTranslationData: Story = {
  args: {
    title: 'Applicable Scenarios',
    // do not pass scenarios, let the component use translation data
  },
};

export const Chinese: Story = {
  args: {
    title: 'Applicable Scenarios',
    // do not pass scenarios, let the component use translation data
  },
  decorators: [createTranslationDecorator('zh')],
};

export const English: Story = {
  args: {
    title: 'Applicable Scenarios',
    // do not pass scenarios, let the component use translation data
  },
  decorators: [createTranslationDecorator('en')],
};
