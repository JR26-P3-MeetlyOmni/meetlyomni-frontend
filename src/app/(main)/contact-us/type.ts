import { UseFormRegister } from 'react-hook-form';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

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
