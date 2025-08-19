import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SAMPLE_TESTIMONIALS } from '../../../../constants/TestimonialSection';
import TestimonialsSection from './TestimonialsSection';

describe('TestimonialsSection', () => {
  it('renders title and subtitle ', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('What do our users say?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Discover firsthand experiences shared by our valued customers. Hear their stories, and feedback that shed light on their journey with us.',
      ),
    ).toBeInTheDocument();
  });

  it('renders all testimonial cards', () => {
    render(<TestimonialsSection />);
    const cards = screen.getAllByTestId('testimonial-card');
    expect(cards).toHaveLength(3);
    expect(screen.getByText('David L.')).toBeInTheDocument();
    expect(screen.getByText('Alex W.')).toBeInTheDocument();
    expect(screen.getByText('Sophie M.')).toBeInTheDocument();
  });

  it('renders visible testimonials (3)', () => {
    render(<TestimonialsSection />);
    SAMPLE_TESTIMONIALS.slice(0, 3).forEach(t => {
      expect(screen.getByText(t.content)).toBeInTheDocument();
    });
  });

  it('renders visible names (3)', () => {
    render(<TestimonialsSection />);
    SAMPLE_TESTIMONIALS.slice(0, 3).forEach(t => {
      expect(screen.getByText(t.name)).toBeInTheDocument();
    });
  });

  it('renders visible roles (3)', () => {
    render(<TestimonialsSection />);
    SAMPLE_TESTIMONIALS.slice(0, 3).forEach(t => {
      expect(screen.getByText(t.role)).toBeInTheDocument();
    });
  });
});
