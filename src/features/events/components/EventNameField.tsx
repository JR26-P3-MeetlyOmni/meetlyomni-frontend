'use client';

import React from 'react';

import { Box, TextField } from '@mui/material';

function EventNameField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box mb={3}>
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
    </Box>
  );
}

export default EventNameField;
