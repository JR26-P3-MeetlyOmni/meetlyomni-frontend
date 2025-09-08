'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import backgroundImage from '@assets/images/EventManagement/background.png';
// Import images
import balloonImage from '@assets/images/EventManagement/balloon.png';

function EmptyState() {
  return (
    <Paper
      elevation={0}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        position: 'relative',
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6" color="text.secondary" align="center">
          There&apos;s nothing here, let&apos;s create a Event
        </Typography>

        <Button
          variant="contained"
          startIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          }
        >
          Create
        </Button>
      </Stack>
    </Paper>
  );
}

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState('interactive');

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 80px)',
        padding: 24,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Page Title with Balloon */}
      <Box style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <Typography variant="h4">Event management</Typography>
        <Image src={balloonImage} alt="Balloon" width={32} height={32} />
      </Box>

      {/* Navigation Tabs */}
      <Box style={{ marginBottom: 24 }}>
        <Button
          variant={activeTab === 'interactive' ? 'contained' : 'outlined'}
          startIcon={<span>💡</span>}
          onClick={handleInteractiveClick}
          style={{ marginRight: 8 }}
        >
          Interactive quiz
        </Button>

        <Button
          variant={activeTab === 'raffle' ? 'contained' : 'outlined'}
          startIcon={<span>🎰</span>}
          onClick={handleRaffleClick}
        >
          Raffle game
        </Button>
      </Box>

      {/* Content Area */}
      <Box style={{ flex: 1 }}>
        <EmptyState />
      </Box>
    </Box>
  );
}
