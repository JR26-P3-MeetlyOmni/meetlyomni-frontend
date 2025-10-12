'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Snackbar } from '@mui/material';

import { ApiError, ensureXsrfCookie } from '../../../../../api/api';
import { updateEvent } from '../../../../../api/eventApi';
import { uploadMedia } from '../../../../../api/mediaApi';
import FormModal from '../../../../../components/Modal/FormModal';
import type {
  EditEventModalProps,
  Event,
  UpdateEventRequest,
  UpdateEventResponse,
} from '../../../../../constants/Event';
import type { RootState } from '../../../../../store/store';
import { useEventForm } from '../../hooks/useEventForm';
import EditEventFormFields from './EditEventFormFields';

/**
 * Upload cover image if a new one was selected
 */
async function uploadCoverImageIfNeeded(
  coverImage: File | null,
  organizationId: string,
): Promise<string | undefined> {
  if (!coverImage) {
    return undefined;
  }

  const uploadResponse = await uploadMedia(coverImage, organizationId, 'events');
  return uploadResponse.url;
}

/**
 * Convert backend UpdateEventResponse to frontend Event type
 */
function convertResponseToEvent(response: UpdateEventResponse): Event {
  return {
    id: response.eventId,
    name: response.title,
    date: response.createdAt,
    description: response.description || '',
    coverImageUrl: response.coverImageUrl,
    status: response.status,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
}

/**
 * Submit updated event with optional image upload
 */
async function submitEventUpdate(
  event: Event,
  formState: { name: string; description: string; coverImage: File | null },
  organizationId: string,
): Promise<Event> {
  // Ensure fresh CSRF token before any API calls
  await ensureXsrfCookie();

  // Upload new image if selected
  const coverImageUrl = await uploadCoverImageIfNeeded(formState.coverImage, organizationId);

  // Prepare JSON payload for backend API
  const payload: UpdateEventRequest = {
    title: formState.name,
    description: formState.description,
    // Include coverImageUrl only if a new image was uploaded
    ...(coverImageUrl ? { coverImageUrl } : {}),
  };

  const response = await updateEvent(event.id, payload);

  // Convert backend response to Event type
  return convertResponseToEvent(response);
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  open,
  event,
  onClose,
  onEventUpdated,
}) => {
  const {
    formState,
    handleChange,
    setIsLoading,
    setError,
    isValid,
    errors,
    isLoading,
    resetForm,
    setFormState,
  } = useEventForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  // Populate form when event changes
  useEffect(() => {
    if (event && open) {
      setFormState({
        name: event.name || '',
        date: event.date || '',
        description: event.description || '',
        coverImage: null,
      });
    }
  }, [event, open, setFormState]);

  const handleSubmit = useCallback(async () => {
    if (!isValid || !event || !user?.organizationId) return;

    setIsLoading(true);

    try {
      const updatedEvent = await submitEventUpdate(event, formState, user.organizationId);

      onEventUpdated?.(updatedEvent);
      setShowSuccess(true);
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
  }, [
    formState,
    isValid,
    event,
    user?.organizationId,
    onEventUpdated,
    onClose,
    setIsLoading,
    setError,
  ]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  return (
    <>
      <FormModal
        open={open}
        title="Edit Event"
        onClose={handleClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        disabledSubmit={!isValid}
        submitButtonText="Save Changes"
      >
        <EditEventFormFields
          formState={formState}
          handleChange={handleChange}
          errors={errors}
          existingImageUrl={event?.coverImageUrl}
        />
      </FormModal>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Event updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditEventModal;
