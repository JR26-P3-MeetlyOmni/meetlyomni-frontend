import { beforeEach, describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import FormModal from './FormModal';

describe('FormModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const setup = (open = true) => {
    return render(
      <FormModal open={open} title="Test Modal" onClose={mockOnClose} onSubmit={mockOnSubmit}>
        <div>Form Content</div>
      </FormModal>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders modal with title and children when open', () => {
    setup(true);

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Form Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('does not render content when closed', () => {
    setup(false);

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Form Content')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking Cancel button', () => {
    setup(true);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onSubmit when clicking Save button', () => {
    setup(true);

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking Close icon', () => {
    setup(true);

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
