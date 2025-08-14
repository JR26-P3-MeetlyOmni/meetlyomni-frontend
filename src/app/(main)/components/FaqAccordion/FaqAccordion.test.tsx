import { describe, expect, it } from 'vitest';

import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FaqAccordion from './FaqAccordion';
import type { FaqItem } from './types';

// Create a minimal theme for testing
const theme = createTheme();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('FaqAccordion', () => {
  const mockFaqItems: FaqItem[] = [
    {
      id: 'test-1',
      question: 'Test Question 1',
      answer: 'Test Answer 1',
    },
    {
      id: 'test-2',
      question: 'Test Question 2',
      answer: 'Test Answer 2',
    },
  ];

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      render(<FaqAccordion />, { wrapper: TestWrapper });

      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Is Meetly Omni free?')).toBeInTheDocument();
      expect(screen.getByText('How to create an activity?')).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      const customTitle = 'Custom FAQ Title';
      render(<FaqAccordion title={customTitle} />, { wrapper: TestWrapper });

      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('should render with custom FAQ items', () => {
      render(<FaqAccordion faqItems={mockFaqItems} />, { wrapper: TestWrapper });

      expect(screen.getByText('Test Question 1')).toBeInTheDocument();
      expect(screen.getByText('Test Question 2')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const customClassName = 'custom-faq-class';
      render(<FaqAccordion className={customClassName} />, { wrapper: TestWrapper });

      const sectionElement = document.querySelector('section');
      expect(sectionElement).toHaveClass(customClassName);
    });
  });

  describe('Accordion Interactions', () => {
    it('should expand accordion when clicked', () => {
      render(<FaqAccordion faqItems={mockFaqItems} />, { wrapper: TestWrapper });

      const firstQuestion = screen.getByText('Test Question 1');
      fireEvent.click(firstQuestion);

      expect(screen.getByText('Test Answer 1')).toBeInTheDocument();
    });

    it('should have proper ARIA attributes', () => {
      render(<FaqAccordion faqItems={mockFaqItems} />, { wrapper: TestWrapper });

      const firstSummary = document.querySelector('#test-1-header');
      expect(firstSummary).toBeInTheDocument();
      expect(firstSummary).toHaveAttribute('aria-controls', 'test-1-content');
    });
  });

  describe('Default Data Usage', () => {
    it('should use default FAQ data when faqItems is undefined', () => {
      render(<FaqAccordion faqItems={undefined} />, { wrapper: TestWrapper });

      expect(screen.getByText('Is Meetly Omni free?')).toBeInTheDocument();
      expect(screen.getByText('Is it necessary to download the application?')).toBeInTheDocument();
    });

    it('should handle empty faqItems array', () => {
      render(<FaqAccordion faqItems={[]} />, { wrapper: TestWrapper });

      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});
