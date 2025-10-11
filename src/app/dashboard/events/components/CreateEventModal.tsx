'use client';

import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { ApiError, apiFetch, ensureXsrfCookie } from '../../../../api/api';
import FormModal from '../../../../components/Modal/FormModal';
import { CreateEventModalProps, CreateEventResponse } from '../../../../constants/Event';
import { RootState } from '../../../../store/store';
import { useEventForm } from '../hooks/useEventForm';
import EventFormFields from './EventFormFields';

const CreateEventModal: React.FC<CreateEventModalProps> = ({ open, onClose, onEventCreated }) => {
  const { formState, handleChange, resetForm, setIsLoading, setError, isValid, errors, isLoading } =
    useEventForm();

  // Get user info from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Check if user is authenticated
      if (!user?.organizationId) {
        setError('User not authenticated or organization not found');
        setIsLoading(false);
        return;
      }

      // Prepare JSON payload for backend API
      const payload = {
        orgId: user.organizationId,
        title: formState.name,
        description: formState.description,
        coverImageUrl: formState.coverImage ? URL.createObjectURL(formState.coverImage) : null,
        location: 'TBD', // TODO: Add location field to form
        language: 'en',
        status: 0, // Draft status
      };

      // Ensure fresh CSRF token before creating event
      await ensureXsrfCookie();

      const data = await apiFetch<CreateEventResponse>('/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (onEventCreated) onEventCreated(data);
      setShowSuccess(true);
      resetForm();
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create event');
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    formState,
    isValid,
    onEventCreated,
    onClose,
    resetForm,
    setIsLoading,
    setError,
    user?.organizationId,
  ]);

  return (
    <>
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

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Event created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateEventModal;
