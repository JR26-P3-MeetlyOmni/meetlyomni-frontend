// Form data structure for contact form
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

// Props for the contact form section component
export interface ContactFormSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  isFormValid: boolean;
  onInputChange: (field: keyof FormData) => (value: string) => void;
  onSubmit: () => Promise<void>;
}

// Props for the reusable form input component
export interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  width?: string;
  required?: boolean;
  type?: string;
}
