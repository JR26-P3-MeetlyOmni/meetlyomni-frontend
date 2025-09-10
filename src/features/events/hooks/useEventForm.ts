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

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.target as HTMLInputElement;
      const { name, value, files } = target;

      setFormState(prev => {
        switch (name) {
          case 'name':
            return { ...prev, name: value };
          case 'date':
            return { ...prev, date: value };
          case 'description':
            return { ...prev, description: value };
          case 'coverImage':
            return { ...prev, coverImage: files && files[0] ? files[0] : null };
          default:
            return prev;
        }
      });
    },
    [],
  );

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
