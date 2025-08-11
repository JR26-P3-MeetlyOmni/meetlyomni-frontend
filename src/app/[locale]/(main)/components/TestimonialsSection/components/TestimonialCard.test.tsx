import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { TestimonialCardProps } from '../types';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  const props: TestimonialCardProps = {
    testimonial: {
      id: 1,
      name: 'Alex W.',
      role: 'Event Manager, Amazon',
      content: 'This is a great product!',
      avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
    },
  };

  it('renders content correctly', () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText('This is a great product!')).toBeInTheDocument();
  });

  it('renders name and role correctly', () => {
    render(<TestimonialCard {...props} />);
    expect(screen.getByText('Alex W.')).toBeInTheDocument();
    expect(screen.getByText('Event Manager, Amazon')).toBeInTheDocument();
  });

  it('renders avatar with correct src and alt', () => {
    render(<TestimonialCard {...props} />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', props.testimonial.avatarUrl);
    expect(avatar).toHaveAttribute('alt', props.testimonial.name);
  });
});
