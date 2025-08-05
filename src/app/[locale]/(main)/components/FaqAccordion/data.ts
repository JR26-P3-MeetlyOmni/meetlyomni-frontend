import { FaqItem } from './interface';

/**
 * Get FAQ data with translations
 * @param t - Translation function from next-intl
 * @returns Array of FAQ items with translated content
 */
export const getFaqData = (t: (key: string) => string): FaqItem[] => [
  {
    id: 'free',
    question: t('faq.questions.free.question'),
    answer: t('faq.questions.free.answer'),
  },
  {
    id: 'create-activity',
    question: t('faq.questions.create-activity.question'),
    answer: t('faq.questions.create-activity.answer'),
  },
  {
    id: 'download-app',
    question: t('faq.questions.download-app.question'),
    answer: t('faq.questions.download-app.answer'),
  },
  {
    id: 'supported-devices',
    question: t('faq.questions.supported-devices.question'),
    answer: t('faq.questions.supported-devices.answer'),
  },
];
