import { useCallback, useEffect, useState } from 'react';

import { EventFormState } from '../../../../constants/Event';

type EventFormErrors = {
  name?: string;
  date?: string;
  description?: string;
};

export const useEventForm = (initialState?: Partial<EventFormState>) => {
  const [formState, setFormState] = useState<EventFormState>({
    name: '',
    date: '',
    description: '',
    coverImage: null,
    ...initialState,
  });

  const [errors, setErrors] = useState<EventFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid =
    formState.name.trim() !== '' &&
    formState.date.trim() !== '' &&
    formState.description.trim() !== '' &&
    Object.keys(errors).length === 0;

  const handleChange = useCallback((field: keyof EventFormState, value: string | File | null) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      name: '',
      date: '',
      description: '',
      coverImage: null,
    });
    setErrors({});
    setError(null);
  }, []);

  const validate = useCallback(() => {
    const tempErrors: EventFormErrors = {};

    if (!formState.name.trim()) tempErrors.name = 'Event name is required';
    if (!formState.date.trim()) tempErrors.date = 'Event date is required';
    if (!formState.description.trim()) tempErrors.description = 'Description is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [formState]);

  useEffect(() => {
    validate();
  }, [formState, validate]);

  return {
    formState,
    setFormState,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleChange,
    resetForm,
    errors,
    isValid,
  };
};
