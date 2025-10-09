import { store } from '@/store/store';
import { describe, expect, it, vi } from 'vitest';

import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';

import EventManagement from './EventManagement';

// --- Mocks ---
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock('@mui/icons-material/Edit', () => ({
  default: () => <span>✏️</span>,
}));

vi.mock('@mui/material', async importOriginal => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  };
});

// ✅ Helper: wrap with Redux Provider
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

  it('switches tab to Raffle Game and shows empty state', () => {
    renderWithRedux(<EventManagement />);
    const raffleTab = screen.getByRole('button', { name: /Raffle Game/i });
    fireEvent.click(raffleTab);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('deletes an event from the list (UI only)', () => {
    renderWithRedux(<EventManagement />);

    //
    const moreButtons = screen.getAllByLabelText('more actions');
    expect(moreButtons.length).toBeGreaterThan(0);

    fireEvent.click(moreButtons[0]);

    //  Delete
    const deleteItem = screen.getByText('Delete');
    fireEvent.click(deleteItem);

    //
    const dialog = screen.getByRole('dialog', { name: /Delete event/i });
    expect(dialog).toBeInTheDocument();

    //  Delete
    const confirmButton = within(dialog).getByRole('button', { name: /Delete/i });
    fireEvent.click(confirmButton);

    //
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
