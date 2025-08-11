import { describe, expect, it } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SAMPLE_TESTIMONIALS } from './data';
import TestimonialsSection from './TestimonialsSection';
import { TestimonialsSectionProps } from './types';

const messages = {
  'testimonials-section': {
    title: 'What do our users say?',
    subtitle:
      'Discover firsthand experiences shared by our valued customers. Hear their stories, and feedback that shed light on their journey with us',
  },
};
const renderWithTranslations = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider messages={messages} locale="en">
      {component}
    </NextIntlClientProvider>,
  );
};

describe('TestimonialsSection', () => {
  const mockProps: TestimonialsSectionProps = {
    data: SAMPLE_TESTIMONIALS,
  };

  it('renders all testimonial cards', () => {
    renderWithTranslations(<TestimonialsSection {...mockProps} />);
    expect(screen.getByText('David L.')).toBeInTheDocument();
    expect(screen.getByText('Alex W.')).toBeInTheDocument();
    expect(screen.getByText('Sophie M.')).toBeInTheDocument();
  });

  it('renders all testimonials', () => {
    renderWithTranslations(<TestimonialsSection {...mockProps} />);

    mockProps?.data?.forEach(testimonial => {
      expect(screen.getByText(testimonial.content)).toBeInTheDocument();
    });
  });

  it('renders all names', () => {
    renderWithTranslations(<TestimonialsSection {...mockProps} />);

    mockProps?.data?.forEach(testimonial => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
    });
  });

  it('renders all roles', () => {
    renderWithTranslations(<TestimonialsSection {...mockProps} />);

    mockProps?.data?.forEach(testimonial => {
      expect(screen.getByText(testimonial.role)).toBeInTheDocument();
    });
  });
});
