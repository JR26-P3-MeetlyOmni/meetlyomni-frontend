import { FaqItem } from '../app/(main)/components/FaqAccordion/types';

/**
 * Static FAQ data
 * @returns Array of FAQ items with static content
 */
export const getFaqData = (): readonly FaqItem[] => [
  {
    id: 'free',
    question: 'Is Meetly Omni free?',
    answer:
      'We offer a free trial, with more advanced features available in the enterprise edition.',
  },
  {
    id: 'create-activity',
    question: 'How to create an activity?',
    answer:
      'Register and create a user first, and then enter the activity centre to create the corresponding activity.',
  },
  {
    id: 'download-app',
    question: 'Is it necessary to download the application?',
    answer:
      'There is no need to download, and the audience can participate by simply scanning the code or entering the activity code.',
  },
  {
    id: 'supported-devices',
    question: 'What devices are supported?',
    answer:
      'It can be used on computers, mobile phones and tablets, compatible with major browsers.',
  },
];
