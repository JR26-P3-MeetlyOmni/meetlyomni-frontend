'use client';

import React, { useCallback } from 'react';

import { ApiError, apiFetch } from '../../../../api/api';
import FormModal from '../../../../components/Modal/FormModal';
import { EditEventModalProps, Event } from '../../../../constants/Event';
import { useEventForm } from '../hooks/useEventForm';
import EventFormFields from './EventFormFields';

const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  event,
  onClose,
  onEventUpdated,
}) => {
  const { formState, handleChange, setIsLoading, setError, isValid, errors, isLoading } =
    useEventForm();

  const handleSubmit = useCallback(async () => {
    if (!isValid || !event) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('date', formState.date);
      formData.append('description', formState.description);
      if (formState.coverImage) formData.append('coverImage', formState.coverImage);

      const data = await apiFetch<Event>(`/v1/events/${event.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (onEventUpdated) onEventUpdated(data);
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update event');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formState, isValid, event, onEventUpdated, onClose, setIsLoading, setError]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <FormModal
      open={open}
      title="Edit Event"
      onClose={handleClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      disabledSubmit={!isValid}
    >
      <EventFormFields
        formState={formState}
        handleChange={handleChange}
        errors={errors}
        existingImageUrl={event?.coverImageUrl}
      />
    </FormModal>
  );
};

export default EditEventModal;
