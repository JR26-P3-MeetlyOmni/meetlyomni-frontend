import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import authReducer from '../../../../features/auth/authSlice';
import EventCard from './EventCard';
import { initialMockEvents } from './eventMocks';

// Create a mock store for testing
const mockStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        role: 'User',
        organizationId: 'test-org-id',
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    },
  },
});

describe('EventCard', () => {
  it('renders event title and creator name', () => {
    const event = initialMockEvents[0];
    render(
      <Provider store={mockStore}>
        <EventCard event={event} />
      </Provider>,
    );
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });
});
