import { beforeEach, describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import EventFormFields from './EventFormFields';

vi.mock('./EventDateField', () => ({
  default: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <input
      data-testid="event-date-field"
      value={value}
      onChange={e => onChange((e.target as HTMLInputElement).value)}
    />
  ),
}));

vi.mock('./FileUploadButton', () => ({
  default: ({
    handleChange,
  }: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => <input data-testid="file-upload" type="file" onChange={handleChange} />,
}));

describe('EventFormFields', () => {
  const mockHandleChange = vi.fn();
  const initialFormState = {
    name: '',
    date: '',
    description: '',
    coverImage: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all fields with initial values', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    expect(screen.getByPlaceholderText(/please enter event name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/please enter description/i)).toHaveValue('');
    expect(screen.getByTestId('event-date-field')).toHaveValue('');
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  test('calls handleChange when name changes', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByPlaceholderText(/please enter event name/i), {
      target: { value: 'New Event' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('name', 'New Event');
  });

  test('calls handleChange when description changes', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByPlaceholderText(/please enter description/i), {
      target: { value: 'This is a description' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('description', 'This is a description');
  });

  test('calls handleChange when date changes', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByTestId('event-date-field'), {
      target: { value: '2025-09-15' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('date', '2025-09-15');
  });

  test('calls handleChange when file is uploaded', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);
    const file = new File(['file-content'], 'test.png', { type: 'image/png' });

    fireEvent.change(screen.getByTestId('file-upload'), {
      target: { files: [file] },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('coverImage', file);
  });

  test('calls handleChange with null when no file is selected', () => {
    render(<EventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByTestId('file-upload'), {
      target: { files: [] },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('coverImage', null);
  });
});
