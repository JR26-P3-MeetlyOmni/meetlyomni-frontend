import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventCard from './EventCard';
import { initialMockEvents } from './eventMocks';
import { convertEventItemToEvent } from './eventUtils';

describe('EventCard', () => {
  it('renders event title and creator name', () => {
    const eventItem = initialMockEvents[0];
    const event = convertEventItemToEvent(eventItem);
    render(<EventCard event={event} onEdit={() => {}} />);
    expect(screen.getByText(event.name)).toBeInTheDocument();
  });
});
