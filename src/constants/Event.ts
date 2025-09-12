export interface EventFormState {
  name: string;
  date: string;
  description: string;
  coverImage: File | null;
}

export interface EventFormFieldsProps {
  formState: EventFormState;
  handleChange: <K extends keyof EventFormState>(field: K, value: EventFormState[K]) => void;
}

export interface CreateEventResponse {
  id: string;
  name: string;
  date: string;
  description: string;
  coverImageUrl?: string;
}

export interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onEventCreated?: (event: CreateEventResponse) => void;
}
