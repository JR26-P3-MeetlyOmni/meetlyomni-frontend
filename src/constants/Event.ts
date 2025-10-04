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
}

export interface CreateEventResponse {
  eventId: string;
  orgId: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  language?: string;
  status: number;
  createdByName?: string;
  createdByAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onEventCreated?: (event: CreateEventResponse) => void;
}
