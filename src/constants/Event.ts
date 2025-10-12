export interface EventFormState {
  name: string;
  date: string;
  description: string;
  coverImage: File | null;
}

export interface EventFormFieldsProps {
  formState: EventFormState;
  handleChange: <K extends keyof EventFormState>(field: K, value: EventFormState[K]) => void;
  errors?: Partial<Record<keyof EventFormState, string>>;
  existingImageUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status: number;
  createdByName?: string;
  createdByAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventResponse {
  eventId: string;
  orgId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status: EventStatus;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onEventCreated?: (event: CreateEventResponse) => void;
}

export interface EditEventModalProps {
  open: boolean;
  event: Event | null;
  onClose: () => void;
  onEventUpdated?: (event: Event) => void;
}

export enum EventStatus {
  Draft = 0,
  Published = 1,
}

export interface EventListItem {
  eventId: string;
  orgId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status: EventStatus;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetEventListResponse {
  events: EventListItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface GetEventListParams {
  orgId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status?: EventStatus;
  startTime?: string;
  endTime?: string;
}

export interface UpdateEventResponse {
  eventId: string;
  orgId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status: EventStatus;
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}
