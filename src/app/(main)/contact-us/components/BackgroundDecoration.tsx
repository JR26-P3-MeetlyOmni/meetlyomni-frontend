'use client';

import { Box, styled } from '@mui/material';

// Background decoration element with gradient overlay
const BackgroundDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%', // Full width
  height: '100%', // Full height
  opacity: 0.5,
  backgroundImage: 'linear-gradient(to bottom, #f0f0f1, #dcdddf4c 30%)',
  zIndex: -1, // Ensure it's behind content
  pointerEvents: 'none', // Don't interfere with interactions
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: '100%',
  },
}));

export default BackgroundDecoration;
