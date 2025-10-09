'use client';

import type { CreateEventResponse, Event } from '@/constants/Event';
import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Button } from '@mui/material';

import CreateEventModal from '../events/components/CreateEventModal';
import EventList from '../events/components/EventList';
import { buildMockEvent, type EventItem, initialMockEvents } from '../events/components/eventMocks';
import { normalizeEventPayload } from '../events/components/eventUtils';
import {
  Content,
  Spacer,
  StyledContainer,
  StyledNavBox,
  StyledNavButton,
  StyledTitle,
  StyledTitleBox,
} from './EventManagement.styles';

export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [events, setEvents] = useState<EventItem[]>(initialMockEvents);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  const handleEventCreated = (payload: CreateEventResponse) => {
    const normalized = normalizeEventPayload(payload);
    const mock = buildMockEvent(normalized);
    setEvents(prev => [mock, ...prev]);
    setOpenCreateModal(false);
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === updatedEvent.id
          ? {
              ...event,
              title: updatedEvent.name,
              description: updatedEvent.description,
              coverImageUrl: updatedEvent.coverImageUrl,
              isDraft: updatedEvent.status === 0,
            }
          : event,
      ),
    );
  };

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
        <Spacer />
        <Button variant="contained" onClick={() => setOpenCreateModal(true)} disableElevation>
          + Create
        </Button>
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

      <Content>
        <EventList
          events={events}
          onCreateClick={() => setOpenCreateModal(true)}
          onEventUpdated={handleEventUpdated}
        />
      </Content>

      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </StyledContainer>
  );
}
