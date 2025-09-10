'use client';

import { DefaultTheme, ThemeProvider } from 'styled-components';

import React, { useCallback } from 'react';

import FormModal from '../../../components/Modal/FormModal';
import {
  CreateEventModalProps,
  // CreateEventResponse,
} from '../../../constants/Event';
import { useEventForm } from '../hooks/useEventForm';
import EventFormFields from './EventFormFields';

const CreateEventModal: React.FC<CreateEventModalProps & { theme: DefaultTheme }> = ({
  open,
  onClose,
  onEventCreated,
  theme,
}) => {
  const { formState, handleChange, resetForm, setIsLoading, setError } = useEventForm();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('date', formState.date);
      formData.append('description', formState.description);
      if (formState.coverImage) {
        formData.append('coverImage', formState.coverImage);
      }

      // TODO: CALL api/v1/events ）
      const response = await fetch('api/v1/events', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      // const data: CreateEventResponse = await response.json();

      if (onEventCreated) {
        // onEventCreated(data);
      }

      resetForm();
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  }, [formState, onEventCreated, onClose, resetForm, setIsLoading, setError]);

  return (
    <ThemeProvider theme={theme}>
      <FormModal
        open={open}
        title="Create Event"
        onClose={onClose}
        onSubmit={handleSubmit}
        theme={theme}
      >
        <EventFormFields formState={formState} handleChange={handleChange} />
      </FormModal>
    </ThemeProvider>
  );
};

export default CreateEventModal;
