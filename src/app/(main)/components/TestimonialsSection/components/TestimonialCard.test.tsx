import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { getAssetUrl } from '../../../../../utils/cdn';
import type { TestimonialCardProps } from '../types';
import TestimonialCard from './TestimonialCard';

describe('AnimatedTestimonialCard', () => {
  const props: TestimonialCardProps = {
    data: {
      position: 'center',
      id: 1,
      name: 'Alex W.',
      role: 'Event Manager, Amazon',
      content: 'This is a great product!',
      avatarUrl: getAssetUrl('StaticFiles/assets/images/TestimonialsSection/Alex_W.png'),
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
    const avatar = screen.getByAltText(props.data.name);
    expect(avatar).toHaveAttribute('src', expect.stringContaining('Alex_W.png'));
    expect(avatar).toHaveAttribute('alt', props.data.name);
  });
});
