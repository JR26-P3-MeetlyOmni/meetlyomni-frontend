'use client';

import React from 'react';

import { Box } from '@mui/material';

//Statistics Page is currently empty, ignore any unappropiate code such as sx, style, etc.
export default function Statistics() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        padding: 3,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    ></Box>
  );
}
