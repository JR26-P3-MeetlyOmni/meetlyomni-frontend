import type {
  CreateEventResponse,
  EventListItem,
  GetEventListParams,
  GetEventListResponse,
  UpdateEventRequest,
  UpdateEventResponse,
} from '@/constants/Event';

import { apiFetch } from './api';

export async function getEventList(params: GetEventListParams): Promise<GetEventListResponse> {
  const { orgId, pageNumber = 1, pageSize = 20 } = params;

  const queryParams = new URLSearchParams({
    orgId,
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await apiFetch<GetEventListResponse>(`/events?${queryParams.toString()}`, {
    method: 'GET',
  });

  return response;
}

export async function getEventById(eventId: string): Promise<EventListItem> {
  const response = await apiFetch<EventListItem>(`/events/${eventId}`, {
    method: 'GET',
  });

  return response;
}

export async function updateEvent(
  eventId: string,
  data: UpdateEventRequest,
): Promise<UpdateEventResponse> {
  const response = await apiFetch<UpdateEventResponse>(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteEvent(eventId: string): Promise<void> {
  await apiFetch(`/events/${eventId}`, {
    method: 'DELETE',
  });
}

export async function createEvent(data: {
  orgId: string;
  title: string;
  description?: string;
  location?: string;
  language?: string;
  status?: number;
}): Promise<CreateEventResponse> {
  const response = await apiFetch<CreateEventResponse>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response;
}
