import { Meta, StoryObj } from '@storybook/nextjs';

import type { AnimatedTestimonialCardProps } from '../types';
import AnimatedTestimonialCard from './AnimatedTestimonialCard';

const meta: Meta<AnimatedTestimonialCardProps> = {
  title: 'LandingPage/AnimatedTestimonialCard',
  component: AnimatedTestimonialCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AnimatedTestimonialCard>;

const mockTestimonial: AnimatedTestimonialCardProps['animatedTestimonial'] = {
  position: 'center',
  id: 1,
  name: 'Alex W',
  role: 'Event Manager, Amazon',
  content:
    'Meetly Omni makes our annual corporate meeting more fun than ever! Interactive answers let the audience really participate in the activity atmosphere more active.',
  avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
};

export const Default: Story = {
  args: {
    animatedTestimonial: mockTestimonial,
  },
};
