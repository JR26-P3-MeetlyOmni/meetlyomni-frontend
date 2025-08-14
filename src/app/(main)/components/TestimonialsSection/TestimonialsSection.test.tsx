import { SAMPLE_TESTIMONIALS } from '@/constants/TestimonialsData';
import { describe, expect, it } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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
    expect(screen.getByText('David L.')).toBeInTheDocument();
    expect(screen.getByText('Alex W.')).toBeInTheDocument();
    expect(screen.getByText('Sophie M.')).toBeInTheDocument();
  });

  it('renders all testimonials', () => {
    render(<TestimonialsSection />);

    SAMPLE_TESTIMONIALS.forEach(testimonial => {
      expect(screen.getByText(testimonial.content)).toBeInTheDocument();
    });
  });

  it('renders all names', () => {
    render(<TestimonialsSection />);

    SAMPLE_TESTIMONIALS?.forEach(testimonial => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
    });
  });

  it('renders all roles', () => {
    render(<TestimonialsSection />);

    SAMPLE_TESTIMONIALS.forEach(testimonial => {
      expect(screen.getByText(testimonial.role)).toBeInTheDocument();
    });
  });
});
