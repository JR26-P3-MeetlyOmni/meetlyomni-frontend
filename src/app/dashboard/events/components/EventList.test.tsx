import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventList from './EventList';
import { initialMockEvents } from './eventMocks';

describe('EventList', () => {
  it('renders list of events', () => {
    render(<EventList events={initialMockEvents} onCreateClick={() => {}} />);
    expect(screen.getByText(initialMockEvents[0].title)).toBeInTheDocument();
  });

  it('renders empty state when no events', () => {
    render(<EventList events={[]} onCreateClick={() => {}} />);
    expect(screen.getByText(/nothing here/i)).toBeInTheDocument();
  });
});
