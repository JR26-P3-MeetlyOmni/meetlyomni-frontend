import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventList from './EventList';
import { initialMockEvents } from './eventMocks';
import { convertEventItemToEvent } from './eventUtils';

// Mock MUI icons to prevent "too many open files" error
vi.mock('@mui/icons-material/Edit', () => ({
  default: () => <span>✏️</span>,
}));

describe('EventList', () => {
  it('renders list of events', () => {
    const events = initialMockEvents.map(convertEventItemToEvent);
    render(<EventList events={events} onCreateClick={() => {}} />);
    expect(screen.getByText(events[0].name)).toBeInTheDocument();
  });

  it('renders empty state when no events', () => {
    render(<EventList events={[]} onCreateClick={() => {}} />);
    expect(screen.getByText(/nothing here/i)).toBeInTheDocument();
  });
});
