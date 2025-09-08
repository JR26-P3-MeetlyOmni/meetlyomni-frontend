'use client';

import { ANIMATION_CONFIG } from '@/constants';

import Link from 'next/link';
import React, { useCallback } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import { Box, Typography, useTheme } from '@mui/material';

const HomeButton = React.memo(() => {
  const theme = useTheme();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.backgroundColor = theme.palette.grey[900];
      e.currentTarget.style.color = 'white';
    },
    [theme.palette.grey],
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = 'inherit';
  }, []);

  return (
    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        display="flex"
        alignItems="center"
        gap={1.5}
        padding={1.5}
        borderRadius={1}
        component="div"
        style={{
          cursor: 'pointer',
          transition: ANIMATION_CONFIG.TRANSITION_PROPERTIES.hoverEffect,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HomeIcon />
        <Typography fontWeight={500}>Home</Typography>
      </Box>
    </Link>
  );
});

HomeButton.displayName = 'HomeButton';

export default HomeButton;
