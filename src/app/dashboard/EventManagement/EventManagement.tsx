// src/app/dashboard/EventManagement/EventManagement.tsx
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
import { Box, Button, Pagination } from '@mui/material';

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
/**
 * Calculate page size based on screen width
 * Since EventList uses vertical layout (1 card per row), page size = number of cards per page
 */
function getPageSizeByScreenWidth(): number {
  if (typeof window === 'undefined') return 5; // SSR fallback

  const width = window.innerWidth;
  if (width >= 2560) return 8; // Ultra-wide / 4K
  if (width >= 1920) return 5; // Full HD 1920x1080 (vertical list, 5 cards)
  if (width >= 1440) return 5; // Medium-large screen
  if (width >= 1024) return 4; // Standard desktop
  if (width >= 768) return 3; // Tablet
  return 2; // Mobile
}

/**
 * Convert CreateEventResponse to EventItem
 */
function convertToEventItem(payload: CreateEventResponse, userName?: string): EventItem {
  return {
    id: payload.eventId,
    title: payload.title,
    description: payload.description,
    coverImageUrl: payload.coverImageUrl,
    creator: {
      name: userName || 'Event Creator',
      avatarUrl: '/assets/images/navbar/user_avatar.png',
    },
    playCount: 0,
    isDraft: payload.status === 0,
    createdAt: payload.createdAt,
  };
}

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [interactiveEvents, setInteractiveEvents] = useState<EventItem[]>(initialMockEvents);
  const [raffleEvents] = useState<EventItem[]>([]);
/**
 * Custom hook for responsive page size
 */
function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(getPageSizeByScreenWidth());

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSizeByScreenWidth();
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSize]);

  return pageSize;
}

/**
 * Update event in the list
 */
function updateEventInList(events: EventItem[], updatedEvent: Event): EventItem[] {
  return events.map(event =>
    event.id === updatedEvent.id
      ? {
          ...event,
          title: updatedEvent.name,
          description: updatedEvent.description,
          coverImageUrl: updatedEvent.coverImageUrl,
          isDraft: updatedEvent.status === 0,
        }
      : event,
  );
}

/**
 * Custom hook to load and manage events
 */
function useEventManagement(orgId: string | undefined, currentPage: number, pageSize: number) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [_loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      if (!orgId) return;

      try {
        setLoading(true);
        const response = await getEventList({ orgId, pageNumber: currentPage, pageSize });
        const frontendEvents = response.events.map(convertBackendEventToFrontend);
        setEvents(frontendEvents);
        setTotalPages(response.totalPages);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [orgId, currentPage, pageSize]);

  return { events, setEvents, totalPages };
}

export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useResponsivePageSize();
  const user = useSelector(selectUser);
  const { events, setEvents, totalPages } = useEventManagement(
    user?.organizationId,
    currentPage,
    pageSize,
  );

  // Reset to first page when page size changes
  const prevPageSize = React.useRef(pageSize);
  useEffect(() => {
    if (prevPageSize.current !== pageSize) {
      setCurrentPage(1);
      prevPageSize.current = pageSize;
    }
  }, [pageSize]);

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
    setEvents(prev => updateEventInList(prev, updatedEvent));
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4} mb={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Content>

      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </StyledContainer>
  );
}
