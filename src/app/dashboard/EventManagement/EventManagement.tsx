
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

export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [events, setEvents] = useState<EventItem[]>(initialMockEvents);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);


  const handleEventCreated = (payload: CreateEventResponse | PartialEventLike) => {
    const anyEvent = payload as PartialEventLike;

    const mock = buildMockEvent({
      title: anyEvent?.title ?? anyEvent?.eventTitle ?? anyEvent?.name ?? 'Untitled event',
      description:
        anyEvent?.description ??
        anyEvent?.eventDescription ??
        'Lots of fun games and prizes waiting for you',
      coverImageUrl: anyEvent?.coverImageUrl ?? anyEvent?.coverUrl ?? anyEvent?.imageUrl,
      isDraft:
        anyEvent?.isDraft === true ||
        anyEvent?.status === 'draft' ||
        anyEvent?.status === 1,
      creatorName: anyEvent?.createdByName ?? 'Alex Li',
      creatorAvatarUrl: anyEvent?.createdByAvatar ?? '/assets/images/navbar/user_avatar.png',
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
        <StyledNavButton variant="outlined" startIcon={<span>💡</span>} onClick={handleInteractiveClick}>
          Interactive Quiz
        </StyledNavButton>
        <StyledNavButton variant="outlined" startIcon={<span>🎰</span>} onClick={handleRaffleClick}>
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
