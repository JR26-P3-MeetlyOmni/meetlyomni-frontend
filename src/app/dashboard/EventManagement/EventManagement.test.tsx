import { describe, expect, it, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventManagement from './EventManagement';

describe('EventManagement', () => {
  it('renders page title and Create button', () => {
    render(<EventManagement />);
    expect(screen.getByText('Event Management')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ create/i })).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<EventManagement />);
    expect(screen.getByText('Interactive Quiz')).toBeInTheDocument();
    expect(screen.getByText('Raffle Game')).toBeInTheDocument();
  });
});
