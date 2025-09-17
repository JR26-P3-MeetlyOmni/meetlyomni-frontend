import { useCallback, useEffect, useState } from 'react';

import { EventFormState } from '../../../constants/Event';

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
  const [isValid, setIsValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setErrors(tempErrors);

    const formIsValid = Object.keys(tempErrors).length === 0;
    setIsValid(formIsValid);
    return formIsValid;
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
