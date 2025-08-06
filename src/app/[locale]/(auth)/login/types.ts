export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export interface LoginFormHook {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  handleInputChange: (
    field: keyof FormData,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
