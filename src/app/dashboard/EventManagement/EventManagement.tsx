'use client';

import { getEventList } from '@/api/eventApi';
import type { CreateEventResponse, Event } from '@/constants/Event';
import { selectUser } from '@/features/auth/authSelectors';
import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CTAButton } from '../../../components/Button/CTAButton';
import { ButtonGroupWrapper } from '../../../components/Modal/FormModal.styles';
import CreateEventModal from '../events/components/CreateEventModal';
import EventList from '../events/components/EventList';
import { type EventItem } from '../events/components/eventMocks';
import { convertBackendEventToFrontend } from '../events/components/eventUtils';
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
  const [events, setEvents] = useState<EventItem[]>([]);
  const [_loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const loadEvents = async () => {
      if (!user?.organizationId) {
        return;
      }

      try {
        setLoading(true);
        const response = await getEventList({
          orgId: user.organizationId,
          pageNumber: 1,
          pageSize: 20,
        });

        const frontendEvents = response.events.map(convertBackendEventToFrontend);
        setEvents(frontendEvents);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [user?.organizationId]);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  const handleEventCreated = (payload: CreateEventResponse) => {
    const normalized = normalizeEventPayload(payload);
    const mock = buildMockEvent(normalized);
    setInteractiveEvents(prev => [mock, ...prev]);
    const newEvent: EventItem = {
      id: payload.eventId,
      title: payload.title,
      description: payload.description,
      coverImageUrl: payload.coverImageUrl,
      creator: {
        name: payload.createdByName || 'Event Creator',
        avatarUrl: payload.createdByAvatar,
      },
      playCount: 0,
      isDraft: payload.status === 0,
      createdAt: payload.createdAt,
    };
    setEvents(prev => [newEvent, ...prev]);
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
        <ButtonGroupWrapper>
          <CTAButton variant="contained" onClick={() => setOpenCreateModal(true)} disableElevation>
            + Create
          </CTAButton>
        </ButtonGroupWrapper>
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
