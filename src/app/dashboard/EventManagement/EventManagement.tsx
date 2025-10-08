// src/app/dashboard/EventManagement/EventManagement.tsx
'use client';

import type { CreateEventResponse } from '@/constants/Event';
import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Button } from '@mui/material';

import CreateEventModal from '../events/components/CreateEventModal';
import EventList from '../events/components/EventList';
import { buildMockEvent, type EventItem, initialMockEvents } from '../events/components/eventMocks';
import { convertEventItemToEvent, normalizeEventPayload } from '../events/components/eventUtils';
import {
  Content,
  Spacer,
  StyledContainer,
  StyledNavBox,
  StyledNavButton,
  StyledTitle,
  StyledTitleBox,
} from './EventManagement.styles';

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

// src/app/dashboard/EventManagement/EventManagement.tsx

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
          events={events.map(convertEventItemToEvent)}
          onCreateClick={() => setOpenCreateModal(true)}
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
