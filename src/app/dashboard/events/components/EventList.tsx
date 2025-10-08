import React from 'react';

import { Event } from '../../../../constants/Event';
import EmptyState from '../../EventManagement/EmptyState';
import EventCard from './EventCard';
import { EmptyWrap, ListRoot } from './EventList.styles';

type Props = {
  events: Event[];
  onCreateClick: () => void;
};

export const EventList: React.FC<Props> = ({ events, onCreateClick }) => {
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
        <EventCard key={e.id} event={e} onEdit={() => {}} />
      ))}
    </ListRoot>
  );
};

export default EventList;
