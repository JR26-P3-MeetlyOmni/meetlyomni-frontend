import type {
  CreateEventResponse,
  EventListItem,
  GetEventListParams,
  GetEventListResponse,
} from '@/constants/Event';

import { apiFetch } from './api';

/**
 * Get paginated list of events for an organization
 */
export async function getEventList(params: GetEventListParams): Promise<GetEventListResponse> {
  const { orgId, pageNumber = 1, pageSize = 20 } = params;

  const queryParams = new URLSearchParams({
    orgId,
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await apiFetch<GetEventListResponse>(`/v1/events?${queryParams.toString()}`, {
    method: 'GET',
  });

  return response;
}

/**
 * Get event details by ID
 */
export async function getEventById(eventId: string): Promise<EventListItem> {
  const response = await apiFetch<EventListItem>(`/v1/events/${eventId}`, {
    method: 'GET',
  });

  return response;
}

/**
 * Update an existing event
 */
export async function updateEvent(
  eventId: string,
  data: Partial<Omit<EventListItem, 'eventId' | 'orgId' | 'createdAt' | 'updatedAt'>>,
): Promise<EventListItem> {
  const response = await apiFetch<EventListItem>(`/v1/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return response;
}

/**
 * Delete an event
 */
export async function deleteEvent(eventId: string): Promise<void> {
  await apiFetch(`/v1/events/${eventId}`, {
    method: 'DELETE',
  });
}

/**
 * Create a new event
 */
export async function createEvent(data: {
  orgId: string;
  title: string;
  description?: string;
  location?: string;
  language?: string;
  status?: number;
}): Promise<CreateEventResponse> {
  const response = await apiFetch<CreateEventResponse>('/v1/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response;
}
