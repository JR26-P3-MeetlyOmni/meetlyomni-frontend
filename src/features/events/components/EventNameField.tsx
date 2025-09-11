'use client';

import React from 'react';

import { TextField } from '@mui/material';

import { StyledBox } from './EventFormFields.styles';

function EventNameField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <StyledBox>
      <label>Event Name</label>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        placeholder="Please enter event name"
        {...{
          inputProps: { maxLength: 100 },
        }}
      />
    </StyledBox>
  );
}

export default EventNameField;
