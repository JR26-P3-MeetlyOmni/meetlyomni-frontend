'use client';

import React, { useCallback } from 'react';

import FormModal from '../../../components/Modal/FormModal';
import { CreateEventModalProps, CreateEventResponse } from '../../../constants/Event';
import { useEventForm } from '../hooks/useEventForm';
import EventFormFields from './EventFormFields';

const CreateEventModal: React.FC<CreateEventModalProps> = ({ open, onClose, onEventCreated }) => {
  const {
    formState,
    handleChange,
    resetForm,
    setIsLoading,
    setError,
    isValid,
    errors,
    isLoading,
    error,
  } = useEventForm();

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('date', formState.date);
      formData.append('description', formState.description);
      if (formState.coverImage) formData.append('coverImage', formState.coverImage);

      const response = await fetch('/api/v1/events', { method: 'POST', body: formData });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create event');
      }

      const data: CreateEventResponse = await response.json();
      if (onEventCreated) onEventCreated(data);

      resetForm();
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  }, [formState, isValid, onEventCreated, onClose, resetForm, setIsLoading, setError]);

  return (
    <FormModal
      open={open}
      title="Create Event"
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      disabledSubmit={!isValid}
    >
      <EventFormFields formState={formState} handleChange={handleChange} />

      {errors.name ? <p style={{ color: 'red', marginTop: 4 }}>{errors.name}</p> : null}
      {errors.date ? <p style={{ color: 'red', marginTop: 4 }}>{errors.date}</p> : null}

      {error ? <p style={{ color: 'red', marginTop: 4 }}>{error}</p> : null}
    </FormModal>
  );
};

export default CreateEventModal;
