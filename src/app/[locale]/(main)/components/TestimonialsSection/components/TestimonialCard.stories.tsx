import { Meta, StoryObj } from '@storybook/nextjs';

import type { TestimonialCardProps } from '../types';
import TestimonialCard from './TestimonialCard';

const meta: Meta<TestimonialCardProps> = {
  title: 'LandingPage/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TestimonialCard>;

const mockTestimonial: TestimonialCardProps['testimonial'] = {
  id: 1,
  name: 'Alex W',
  role: 'Event Manager, Amazon',
  content:
    'Meetly Omni makes our annual corporate meeting more fun than ever! Interactive answers let the audience really participate in the activity atmosphere more active.',
  avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
};

export const Default: Story = {
  args: {
    testimonial: mockTestimonial,
  },
};
