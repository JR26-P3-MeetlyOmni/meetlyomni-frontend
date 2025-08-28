import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

// Form data structure for contact form
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

// Props for the contact form section component
export interface ContactFormSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  isSubmitting: boolean;
  isValid: boolean;
  onSubmit: (data: FormData) => Promise<void>;
}

// Props for the reusable form input component
export interface FormInputProps {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<FormData>;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  width?: string;
  type?: string;
}
