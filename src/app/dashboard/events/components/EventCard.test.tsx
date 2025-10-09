import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventCard from './EventCard';
import { initialMockEvents } from './eventMocks';

describe('EventCard', () => {
  it('renders event title and creator name', () => {
    const event = initialMockEvents[0];
    render(<EventCard event={event} />);
    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.creator.name)).toBeInTheDocument();
  });
});
