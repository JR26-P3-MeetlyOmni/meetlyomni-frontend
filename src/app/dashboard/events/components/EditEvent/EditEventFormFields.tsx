'use client';

import React, { useCallback } from 'react';

import { Box, TextField, Typography } from '@mui/material';

import { EventFormFieldsProps } from '../../../../../constants/Event';
import EventDateField from '../EventDateField';
import { StyledBox } from '../EventFormFields.styles';
import FileReUploadButton from './FileReUploadButton';

const EditEventFormFields: React.FC<EventFormFieldsProps> = ({
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Current Cover Image:
            </Typography>
            <Box
              component="img"
              src={existingImageUrl}
              alt="Current event cover"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.300',
              }}
            />
          </Box>
        ) : null}
        {formState.coverImage ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              New Cover Image Selected: {formState.coverImage.name}
            </Typography>
          </Box>
        ) : null}
        <FileReUploadButton name="coverImage" handleChange={handleFileChange} />
      </StyledBox>
    </StyledBox>
  );
};

export default EditEventFormFields;
