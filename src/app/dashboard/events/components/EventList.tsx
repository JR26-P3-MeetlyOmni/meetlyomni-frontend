import { Event } from '@/constants/Event';

import React from 'react';

import EmptyState from '../../EventManagement/EmptyState';
import EventCard from './EventCard';
import { EmptyWrap, ListRoot } from './EventList.styles';
import type { EventItem } from './eventMocks';

type Props = {
  events: EventItem[];
  onCreateClick: () => void;
  onEventUpdated?: (event: Event) => void;
};

export const EventList: React.FC<Props> = ({ events, onCreateClick, onEventUpdated }) => {
  if (!events || events.length === 0) {
    return (
      <EmptyWrap data-testid="empty-state">
        <EmptyState onCreateClick={onCreateClick} />
      </EmptyWrap>
    );
  }

  return (
    <ListRoot role="list" aria-label="event-list">
      {events.map(e => (
        <EventCard key={e.id} event={e} onEventUpdated={onEventUpdated} />
      ))}
    </ListRoot>
  );
};

export default EventList;
