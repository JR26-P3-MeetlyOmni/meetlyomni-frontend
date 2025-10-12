import type { CreateEventResponse, Event } from '@/constants/Event';

import { AVATAR_PLACEHOLDER, type EventItem, type NewEventInput } from './eventMocks';
import type { PartialEventLike } from './eventTypes';

export const EVENT_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1,
} as const;

export const convertEventItemToEvent = (item: EventItem): Event => ({
  id: item.id,
  name: item.title,
  date: item.createdAt,
  description: item.description || '',
  coverImageUrl: item.coverImageUrl,
  status: item.isDraft ? EVENT_STATUS.DRAFT : EVENT_STATUS.PUBLISHED,
  createdByName: item.creator.name,
  createdByAvatar: item.creator.avatarUrl,
  createdAt: item.createdAt,
  updatedAt: item.createdAt,
});

export const normalizeEventPayload = (
  payload: CreateEventResponse | PartialEventLike,
): NewEventInput => {
  const e = payload as PartialEventLike;

  const isDraft = e.isDraft === true || e.status === 'draft' || e.status === EVENT_STATUS.DRAFT;

  return {
    title: e.title ?? e.eventTitle ?? e.name ?? 'Untitled event',
    description:
      e.description ?? e.eventDescription ?? 'Lots of fun games and prizes waiting for you',

    coverImageUrl:
      e.coverImageUrl ??
      e.coverUrl ??
      e.imageUrl ??
      '/assets/images/FeatureImages/data_visualization.webp',
    isDraft,
    creatorName: e.createdByName || 'Alex Li',
    creatorAvatarUrl: e.createdByAvatar || '/assets/images/navbar/user_avatar.png',
  };
};

export const normalizeEventForStory = (e: Partial<EventItem>, fallbackId: string): EventItem => ({
  id: e.id || fallbackId,
  title: e.title || 'Untitled Event',
  description: e.description || 'No description available.',
  coverImageUrl: e.coverImageUrl || '/assets/images/FeatureImages/data_visualization.webp',
  isDraft: e.isDraft ?? false,
  creator: e.creator || {
    name: 'Anonymous',
    avatarUrl: '/assets/images/navbar/user_avatar.png',
  },
  playCount: e.playCount ?? 0,
  createdAt: e.createdAt || new Date().toISOString(),
});

export const convertBackendEventToFrontend = (
  backendEvent: import('@/constants/Event').EventListItem,
): EventItem => ({
  id: backendEvent.eventId,
  title: backendEvent.title,
  description: backendEvent.description,
  coverImageUrl: backendEvent.coverImageUrl,
  creator: {
    name: 'Event Creator',
    avatarUrl: AVATAR_PLACEHOLDER,
  },
  playCount: 0,
  isDraft: backendEvent.status === EVENT_STATUS.DRAFT,
  createdAt: backendEvent.createdAt,
});
