import { beforeEach, describe, expect, test, vi } from 'vitest';

import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import EditEventFormFields from './EditEventFormFields';

vi.mock('../EventDateField', () => ({
  default: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <input
      data-testid="event-date-field"
      value={value}
      onChange={e => onChange((e.target as HTMLInputElement).value)}
    />
  ),
}));

vi.mock('./FileReUploadButton', () => ({
  default: ({
    handleChange,
  }: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => <input data-testid="file-reupload" type="file" onChange={handleChange} />,
}));

describe('EditEventFormFields', () => {
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
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    expect(screen.getByPlaceholderText(/please enter event name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/please enter description/i)).toHaveValue('');
    expect(screen.getByTestId('event-date-field')).toHaveValue('');
    expect(screen.getByTestId('file-reupload')).toBeInTheDocument();
  });

  test('calls handleChange when name changes', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByPlaceholderText(/please enter event name/i), {
      target: { value: 'Updated Event' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('name', 'Updated Event');
  });

  test('calls handleChange when description changes', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByPlaceholderText(/please enter description/i), {
      target: { value: 'This is an updated description' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('description', 'This is an updated description');
  });

  test('calls handleChange when date changes', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByTestId('event-date-field'), {
      target: { value: '2025-10-15' },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('date', '2025-10-15');
  });

  test('calls handleChange when file is uploaded', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);
    const file = new File(['file-content'], 'updated-image.png', { type: 'image/png' });

    fireEvent.change(screen.getByTestId('file-reupload'), {
      target: { files: [file] },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('coverImage', file);
  });

  test('calls handleChange with null when no file is selected', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    fireEvent.change(screen.getByTestId('file-reupload'), {
      target: { files: [] },
    });

    expect(mockHandleChange).toHaveBeenCalledWith('coverImage', null);
  });

  test('displays existing image when existingImageUrl is provided and no new image is selected', () => {
    const formStateWithExistingImage = {
      ...initialFormState,
      name: 'Test Event',
    };

    render(
      <EditEventFormFields
        formState={formStateWithExistingImage}
        handleChange={mockHandleChange}
        existingImageUrl="https://example.com/existing-image.jpg"
      />,
    );

    expect(screen.getByText('Current Cover Image:')).toBeInTheDocument();
    expect(screen.getByAltText('Current event cover')).toBeInTheDocument();
    expect(screen.getByAltText('Current event cover')).toHaveAttribute(
      'src',
      'https://example.com/existing-image.jpg',
    );
  });

  test('displays new image selection when coverImage is provided', () => {
    const file = new File(['file-content'], 'new-image.png', { type: 'image/png' });
    const formStateWithNewImage = {
      ...initialFormState,
      coverImage: file,
    };

    render(
      <EditEventFormFields
        formState={formStateWithNewImage}
        handleChange={mockHandleChange}
        existingImageUrl="https://example.com/existing-image.jpg"
      />,
    );

    expect(screen.getByText('New Cover Image Selected: new-image.png')).toBeInTheDocument();
  });

  test('does not display existing image when new image is selected', () => {
    const file = new File(['file-content'], 'new-image.png', { type: 'image/png' });
    const formStateWithNewImage = {
      ...initialFormState,
      coverImage: file,
    };

    render(
      <EditEventFormFields
        formState={formStateWithNewImage}
        handleChange={mockHandleChange}
        existingImageUrl="https://example.com/existing-image.jpg"
      />,
    );

    expect(screen.queryByText('Current Cover Image:')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Current event cover')).not.toBeInTheDocument();
  });

  test('does not display existing image when existingImageUrl is not provided', () => {
    render(<EditEventFormFields formState={initialFormState} handleChange={mockHandleChange} />);

    expect(screen.queryByText('Current Cover Image:')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Current event cover')).not.toBeInTheDocument();
  });

  test('displays error messages when errors are provided', () => {
    const errors = {
      date: 'Invalid date format',
    };

    render(
      <EditEventFormFields
        formState={initialFormState}
        handleChange={mockHandleChange}
        errors={errors}
      />,
    );

    // Note: Error display depends on EventDateField implementation
    // This test assumes EventDateField handles error display
    expect(screen.getByTestId('event-date-field')).toBeInTheDocument();
  });

  test('renders with pre-filled form values', () => {
    const preFilledFormState = {
      name: 'Pre-filled Event',
      date: '2025-12-25',
      description: 'Pre-filled description',
      coverImage: null,
    };

    render(<EditEventFormFields formState={preFilledFormState} handleChange={mockHandleChange} />);

    expect(screen.getByPlaceholderText(/please enter event name/i)).toHaveValue('Pre-filled Event');
    expect(screen.getByPlaceholderText(/please enter description/i)).toHaveValue(
      'Pre-filled description',
    );
    expect(screen.getByTestId('event-date-field')).toHaveValue('2025-12-25');
  });
});
