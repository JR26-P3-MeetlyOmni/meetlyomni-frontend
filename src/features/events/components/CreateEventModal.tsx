'use client';

import React, { useCallback } from 'react';

import FormModal from '../../../components/Modal/FormModal';
import { CreateEventModalProps, CreateEventResponse } from '../../../constants/Event';
import { API_BASE_URL } from '../../auth/authApi';
import { useEventForm } from '../hooks/useEventForm';
import EventFormFields from './EventFormFields';

const CreateEventModal: React.FC<CreateEventModalProps> = ({ open, onClose, onEventCreated }) => {
  const { formState, handleChange, resetForm, setIsLoading, setError, isValid, errors, isLoading } =
    useEventForm();

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('date', formState.date);
      formData.append('description', formState.description);
      if (formState.coverImage) formData.append('coverImage', formState.coverImage);

      const response = await fetch(`${API_BASE_URL}/v1/events`, { method: 'POST', body: formData });

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
      <EventFormFields formState={formState} handleChange={handleChange} errors={errors} />
    </FormModal>
  );
};

export default CreateEventModal;
