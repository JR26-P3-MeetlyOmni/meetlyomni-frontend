'use client';

import React, { useCallback } from 'react';

import { TextField } from '@mui/material';

import { EventFormFieldsProps } from '../../../../constants/Event';
import EventDateField from './EventDateField';
import { StyledBox } from './EventFormFields.styles';
import FileUploadButton from './FileUploadButton';

const EventFormFields: React.FC<EventFormFieldsProps> = ({ formState, handleChange, errors }) => {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value),
    [handleChange],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value),
    [handleChange],
  );

  const handleDateChange = useCallback(
    (value: string) => handleChange('date', value),
    [handleChange],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange('coverImage', e.target.files?.[0] ?? null),
    [handleChange],
  );

  return (
    <StyledBox>
      <StyledBox>
        <label>Event Name</label>
        <TextField
          fullWidth
          value={formState.name}
          onChange={handleNameChange}
          variant="outlined"
          placeholder="Please enter event name"
          inputProps={{ maxLength: 100 }}
          error={!!errors?.name}
          helperText={errors?.name}
        />
      </StyledBox>

      <EventDateField
        value={formState.date}
        onChange={handleDateChange}
        error={!!errors?.date}
        helperText={errors?.date}
      />

      <StyledBox>
        <label>Description</label>
        <TextField
          fullWidth
          value={formState.description}
          onChange={handleDescriptionChange}
          multiline
          variant="outlined"
          rows={4}
          placeholder="Please enter description"
          inputProps={{ maxLength: 500 }}
          error={!!errors?.description}
          helperText={errors?.description}
        />
      </StyledBox>

      <FileUploadButton name="coverImage" handleChange={handleFileChange} />
    </StyledBox>
  );
};

export default EventFormFields;
