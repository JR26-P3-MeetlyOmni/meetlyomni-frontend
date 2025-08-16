export interface SignInFormProps {
  formData: { email: string; password: string };
  errors: { email: string; password: string; auth?: string | null };
  isSubmitting: boolean;
  hasSubmitted: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleInputBlur: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface EmailFieldProps {
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface PasswordFieldProps {
  value: string;
  error: string;
  showError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
