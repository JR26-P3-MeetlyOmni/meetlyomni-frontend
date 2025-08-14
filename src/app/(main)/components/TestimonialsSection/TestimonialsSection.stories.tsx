import { SAMPLE_TESTIMONIALS } from '@/constants/TestimonialsData';

import type { Meta, StoryObj } from '@storybook/nextjs';

import TestimonialsSection from './TestimonialsSection';

const meta: Meta<typeof TestimonialsSection> = {
  title: 'LandingPage/TestimonialSection',
  component: TestimonialsSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {
  args: {
    data: SAMPLE_TESTIMONIALS,
  },
};
