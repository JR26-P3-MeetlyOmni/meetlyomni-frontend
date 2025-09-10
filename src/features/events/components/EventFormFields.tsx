'use client';

import React, { useCallback } from 'react';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';

import { EventFormFieldsProps } from '../../../constants/Event';
import FileUploadButton from './FileUploadButton';

function EventFormFields({ formState, handleChange }: EventFormFieldsProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    },
    [handleChange],
  );

  const handleOpenDatePicker = useCallback(() => {
    // TODO: real date picker
    alert('Open date picker');
  }, []);

  return (
    <Box>
      <Box mb={2}>
        <label>Event Name</label>
        <TextField
          fullWidth
          value={formState.name}
          onChange={handleChange}
          variant="outlined"
          placeholder="Please enter event name"
          slotProps={
            {
              // input: {
              //   maxLength: 100
              // }
            }
          }
          helperText={`${formState.name.length}/100`}
        />
      </Box>

      <Box mb={2}>
        <label>Date</label>
        <TextField
          fullWidth
          type="date"
          value={formState.date}
          onChange={handleChange}
          variant="outlined"
          placeholder="Select date"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleOpenDatePicker}>
                    <CalendarMonthOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>

      <Box mb={2}>
        <label>Description</label>
        <TextField
          fullWidth
          value={formState.description}
          onChange={handleChange}
          rows={4}
          multiline
          variant="outlined"
          placeholder="Please enter description"
        />
      </Box>

      <FileUploadButton name="coverImage" handleChange={handleFileChange} />
    </Box>
  );
}

export default EventFormFields;
