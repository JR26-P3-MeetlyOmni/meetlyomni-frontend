import { store } from '@/store/store';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EventManagement from './EventManagement';

// --- Mocks ---
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock('@mui/material', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  };
});

// Helper: wrap with Redux Provider
const renderWithRedux = (ui: React.ReactElement) => render(<Provider store={store}>{ui}</Provider>);

// --- Tests ---
describe('EventManagement', () => {
  it('renders page title and Create button', () => {
    renderWithRedux(<EventManagement />);
    expect(screen.getByText('Event Management')).toBeInTheDocument();
    expect(screen.getByText('+ Create')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    renderWithRedux(<EventManagement />);
    expect(screen.getByText('Interactive Quiz')).toBeInTheDocument();
    expect(screen.getByText('Raffle Game')).toBeInTheDocument();
  });
});
