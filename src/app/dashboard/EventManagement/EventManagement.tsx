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

type ActiveTab = 'interactive' | 'raffle';

// TODO: integrate backend when available
async function _deleteEvent(_id: string): Promise<void> {
  // no-op for UI-only ticket
}

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [interactiveEvents, setInteractiveEvents] = useState<EventItem[]>(initialMockEvents);
  const [raffleEvents] = useState<EventItem[]>([]);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  const handleEventCreated = (payload: CreateEventResponse) => {
    const normalized = normalizeEventPayload(payload);
    const mock = buildMockEvent(normalized);
    setInteractiveEvents(prev => [mock, ...prev]);
    setOpenCreateModal(false);
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    setInteractiveEvents(prev =>
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

  const handleDelete = async (id: string) => {
    // await deleteEvent(id); // TODO: integrate when backend is ready
    setInteractiveEvents(prev => prev.filter(e => e.id !== id));
  };

  const currentEvents = activeTab === 'interactive' ? interactiveEvents : raffleEvents;

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
          variant={activeTab === 'interactive' ? 'contained' : 'outlined'}
          startIcon={<span>💡</span>}
          onClick={handleInteractiveClick}
        >
          Interactive Quiz
        </StyledNavButton>
        <StyledNavButton
          variant={activeTab === 'raffle' ? 'contained' : 'outlined'}
          startIcon={<span>🎰</span>}
          onClick={handleRaffleClick}
        >
          Raffle Game
        </StyledNavButton>
      </StyledNavBox>

      <Content>
        <EventList
          events={currentEvents}
          onCreateClick={() => setOpenCreateModal(true)}
          onEventUpdated={handleEventUpdated}
          onDelete={handleDelete}
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
