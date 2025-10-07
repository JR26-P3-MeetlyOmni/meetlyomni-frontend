'use client';

import React, { useCallback } from 'react';

import { TextField } from '@mui/material';

import { EventFormFieldsProps } from '../../../../constants/Event';
import EventDateField from './EventDateField';
import { CoverImage, ImageContainer, ImageLabel, StyledBox } from './EventFormFields.styles';
import FileUploadButton from './FileUploadButton';

const EventFormFields: React.FC<EventFormFieldsProps> = ({
  formState,
  handleChange,
  errors,
  existingImageUrl,
}) => {
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
        <TextField
          required
          label="Event Name"
          fullWidth
          margin="normal"
          value={formState.name}
          onChange={handleNameChange}
          variant="outlined"
          placeholder="Please enter event name"
          inputProps={{ maxLength: 100 }}
        />
      </StyledBox>

      <EventDateField
        value={formState.date}
        onChange={handleDateChange}
        error={!!errors?.date}
        helperText={errors?.date}
      />

      <StyledBox>
        <TextField
          required
          label="Description"
          fullWidth
          value={formState.description}
          onChange={handleDescriptionChange}
          multiline
          variant="outlined"
          rows={4}
          placeholder="Please enter description"
          inputProps={{ maxLength: 500 }}
        />
      </StyledBox>

      <StyledBox>
        {existingImageUrl && !formState.coverImage ? (
          <ImageContainer>
            <ImageLabel variant="body2">Current Cover Image:</ImageLabel>
            <CoverImage src={existingImageUrl} alt="Current event cover" />
          </ImageContainer>
        ) : null}
        {formState.coverImage ? (
          <ImageContainer>
            <ImageLabel variant="body2">
              New Cover Image Selected: {formState.coverImage.name}
            </ImageLabel>
          </ImageContainer>
        ) : null}
        <FileUploadButton name="coverImage" handleChange={handleFileChange} />
      </StyledBox>
    </StyledBox>
  );
};

export default EventFormFields;
