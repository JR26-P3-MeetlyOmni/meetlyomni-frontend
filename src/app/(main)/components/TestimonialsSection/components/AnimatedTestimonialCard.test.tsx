import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { AnimatedTestimonialCardProps } from '../types';
import AnimatedTestimonialCard from './AnimatedTestimonialCard';

describe('AnimatedTestimonialCard', () => {
  const props: AnimatedTestimonialCardProps = {
    animatedTestimonial: {
      position: 'center',
      id: 1,
      name: 'Alex W.',
      role: 'Event Manager, Amazon',
      content: 'This is a great product!',
      avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
    },
  };

  it('renders content correctly', () => {
    render(<AnimatedTestimonialCard {...props} />);
    expect(screen.getByText('This is a great product!')).toBeInTheDocument();
  });

  it('renders name and role correctly', () => {
    render(<AnimatedTestimonialCard {...props} />);
    expect(screen.getByText('Alex W.')).toBeInTheDocument();
    expect(screen.getByText('Event Manager, Amazon')).toBeInTheDocument();
  });

  it('renders avatar with correct src and alt', () => {
    render(<AnimatedTestimonialCard {...props} />);
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', props.animatedTestimonial.avatarUrl);
    expect(avatar).toHaveAttribute('alt', props.animatedTestimonial.name);
  });
});
