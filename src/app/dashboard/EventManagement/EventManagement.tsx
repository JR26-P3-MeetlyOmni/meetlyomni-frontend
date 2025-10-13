// src/app/dashboard/EventManagement/EventManagement.tsx
'use client';

import { ensureXsrfCookie } from '@/api/api';
import { deleteEvent } from '@/api/eventApi';
import { CTAButton } from '@/components/Button/CTAButton';
import { ButtonGroupWrapper } from '@/components/Modal/FormModal.styles';

import type { CreateEventResponse, Event } from '@/constants/Event';
import { selectUser } from '@/features/auth/authSelectors';
import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Pagination } from '@mui/material';

import CreateEventModal from '../events/components/CreateEventModal';
import EventList from '../events/components/EventList';
import type { EventItem } from '../events/components/eventMocks';
import {
  useEventManagement,
  usePageSizeReset,
  useResponsivePageSize,
} from './EventManagement.hooks';
import {
  Content,
  Spacer,
  StyledContainer,
  StyledTitle,
  StyledTitleBox,
} from './EventManagement.styles';
import EventTabs, { type ActiveTab } from './EventTabs';

// src/app/dashboard/EventManagement/EventManagement.tsx

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [interactiveEvents, setInteractiveEvents] = useState<EventItem[]>([]);
  const [raffleEvents] = useState<EventItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useResponsivePageSize();
  const user = useSelector(selectUser);
  const { events, totalPages, reload } = useEventManagement(
    user?.organizationId,
    currentPage,
    pageSize,
  );

  useEffect(() => setInteractiveEvents(events), [events]);
  usePageSizeReset(pageSize, setCurrentPage);

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);
  const handleEventCreated = (_payload: CreateEventResponse) => {
    reload();
    setOpenCreateModal(false);
  };
  const handleEventUpdated = (_updatedEvent: Event) => {
    reload();
  };
  const handlePageChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await ensureXsrfCookie();
      await deleteEvent(id);
      reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete event:', error);
    }
  };
  const currentEvents = activeTab === 'interactive' ? interactiveEvents : raffleEvents;
  return (
    <>
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
            <CTAButton
              variant="contained"
              onClick={() => setOpenCreateModal(true)}
              disableElevation
            >
              + Create
            </CTAButton>
          </ButtonGroupWrapper>
        </StyledTitleBox>
        <EventTabs
          activeTab={activeTab}
          onInteractiveClick={handleInteractiveClick}
          onRaffleClick={handleRaffleClick}
        />
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
      </StyledContainer>
      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </>
  );
}
