import { useCallback, useState } from 'react';

import { EventFormState } from '../../../constants/Event';

export const useEventForm = (initialState?: Partial<EventFormState>) => {
  const [formState, setFormState] = useState<EventFormState>({
    name: '',
    date: '',
    description: '',
    coverImage: null,
    ...initialState,
  });

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
    setError(null);
  }, []);

  return {
    formState,
    setFormState,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleChange,
    resetForm,
  };
};
