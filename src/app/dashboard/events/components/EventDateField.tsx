'use client';

import dayjs, { Dayjs } from 'dayjs';

import React, { useCallback } from 'react';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { StyledBox } from './EventFormFields.styles';

interface EventDateFieldProps {
  value: string;
  onChange: (date: string) => void;
  error?: boolean;
  helperText?: string;
}

const EventDateField: React.FC<EventDateFieldProps> = ({ value, onChange }) => {
  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      onChange(newValue ? newValue.toISOString() : '');
    },
    [onChange],
  );

  return (
    <StyledBox>
      <label>Date</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
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
    </StyledBox>
  );
};

export default EventDateField;
