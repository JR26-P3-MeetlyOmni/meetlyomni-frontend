'use client';

import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';

import type { CreateEventResponse } from '../../../constants/Event';
import CreateEventModal from '../events/components/CreateEventModal';
import EventList from '../events/components/EventList';
import { buildMockEvent, type EventItem, initialMockEvents } from '../events/components/eventMocks';
import {
  Content,
  Spacer,
  StyledContainer,
  StyledNavBox,
  StyledNavButton,
  StyledTitle,
  StyledTitleBox,
} from './EventManagement.styles';

// ===============================
// ✅ Constants & Types
// ===============================
enum EVENT_STATUS {
  DRAFT = 0,
  PUBLISHED = 1,
}

type PartialEventLike = {
  title?: string;
  eventTitle?: string;
  name?: string;
  description?: string;
  eventDescription?: string;
  coverImageUrl?: string;
  coverUrl?: string;
  imageUrl?: string;
  status?: string | number;
  isDraft?: boolean;
  createdByName?: string;
  createdByAvatar?: string;
};

// ===============================
// ✅ Helper Function
// ===============================
function normalizeEventPayload(payload: CreateEventResponse | PartialEventLike) {
  const anyEvent = payload as PartialEventLike;

  const title =
    anyEvent.title ?? anyEvent.eventTitle ?? anyEvent.name ?? 'Untitled event';

  const description =
    anyEvent.description ??
    anyEvent.eventDescription ??
    'Lots of fun games and prizes waiting for you';

  const coverImageUrl =
    anyEvent.coverImageUrl ?? anyEvent.coverUrl ?? anyEvent.imageUrl;

  const isDraft =
    anyEvent.isDraft === true ||
    anyEvent.status === 'draft' ||
    anyEvent.status === EVENT_STATUS.DRAFT;

  return { title, description, coverImageUrl, isDraft };
}

// ===============================
// ✅ Component
// ===============================
export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [events, setEvents] = useState<EventItem[]>(initialMockEvents);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  const handleEventCreated = (payload: CreateEventResponse | PartialEventLike) => {
    const normalized = normalizeEventPayload(payload);
    const apiResponse = payload as CreateEventResponse;

    const mock = buildMockEvent({
      ...normalized,
      creatorName: apiResponse.createdByName || 'Alex Li',
      creatorAvatarUrl: apiResponse.createdByAvatar || '/assets/images/navbar/user_avatar.png',
    });

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
        <StyledNavButton
          variant="outlined"
          startIcon={<span>🎰</span>}
          onClick={handleRaffleClick}
        >
          Raffle Game
        </StyledNavButton>
      </StyledNavBox>

      <Content>
        <EventList events={events} onCreateClick={() => setOpenCreateModal(true)} />
      </Content>

      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </StyledContainer>
  );
}
