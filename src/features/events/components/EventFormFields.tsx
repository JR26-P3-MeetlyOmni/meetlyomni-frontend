'use client';

import dayjs, { Dayjs } from 'dayjs';

import React, { useCallback } from 'react';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { EventFormFieldsProps } from '../../../constants/Event';
import { StyledBox } from './EventFormFields.styles';
import EventNameField from './EventNameField';
import FileUploadButton from './FileUploadButton';

function EventFormFields({ formState, handleChange }: EventFormFieldsProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    },
    [handleChange],
  );

  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      handleChange({
        target: { name: 'date', value: newValue ? newValue.toISOString() : null },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    },
    [handleChange],
  );

  return (
    <StyledBox>
      <EventNameField value={formState.name} onChange={handleChange} />

      <Box mb={3}>
        <label>Date</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={formState.date ? dayjs(formState.date) : null}
            onChange={handleDateChange}
            slots={{
              openPickerIcon: CalendarMonthOutlinedIcon,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                placeholder: 'Select date',
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box mb={2}>
        <label>Description</label>
        <TextField
          fullWidth
          value={formState.description}
          onChange={handleChange}
          multiline
          variant="outlined"
          placeholder="Please enter description"
          {...{
            inputProps: { maxLength: 500 },
          }}
        />
      </Box>

      <FileUploadButton name="coverImage" handleChange={handleFileChange} />
    </StyledBox>
  );
}

export default EventFormFields;
