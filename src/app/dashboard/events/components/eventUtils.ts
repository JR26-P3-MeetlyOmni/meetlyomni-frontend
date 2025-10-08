import type { CreateEventResponse } from '@/constants/Event';

import type { EventItem, NewEventInput } from './eventMocks';
import type { PartialEventLike } from './eventTypes';

export const EVENT_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1,
} as const;

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
