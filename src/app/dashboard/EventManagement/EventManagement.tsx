'use client';

import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CreateEventResponse } from '../../../constants/Event';
import CreateEventModal from '../events/components/CreateEventModal';
import EmptyState from './EmptyState';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 80px)',
  padding: theme.spacing(3),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));

const StyledNavBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledNavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: 'transparent',
  borderColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  fontWeight: 'normal',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[900],
  },
}));

export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');

  const [openCreateModal, setOpenCreateModal] = useState(false);

  // TODO: currently events are not used，use events state to render event list later
  const [_events, setEvents] = useState<CreateEventResponse[]>([]);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  return (
    <StyledContainer>
      <StyledTitleBox>
        <StyledTitle variant="h4">Event Management</StyledTitle>
        <Image
          src={getAssetUrl('StaticFiles/assets/images/EventManagement/balloon.png')}
          alt="Balloon"
          width={32}
          height={32}
        />
      </StyledTitleBox>

      <StyledNavBox>
        <StyledNavButton
          variant="outlined"
          startIcon={<span>💡</span>}
          onClick={handleInteractiveClick}
        >
          Interactive Quiz
        </StyledNavButton>

        <StyledNavButton variant="outlined" startIcon={<span>🎰</span>} onClick={handleRaffleClick}>
          Raffle Game
        </StyledNavButton>
      </StyledNavBox>

      <Box style={{ flex: 1 }}>
        {/* TODO: Replace EmptyState with event list rendering when events API is ready */}
        <EmptyState onCreateClick={() => setOpenCreateModal(true)} />
      </Box>

      {/* Create Event Modal */}
      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEventCreated={newEvent => {
          setEvents(prev => [...prev, newEvent]);
          setOpenCreateModal(false);
        }}
      />
    </StyledContainer>
  );
}
