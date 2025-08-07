// Form data types
export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

// Login status enum for better state management
export enum LoginStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// Login state management
export interface LoginState {
  status: LoginStatus;
  error: string | null;
}

// API-related types
export interface LoginResult {
  success: boolean;
  message: string;
  token?: string;
}

// Error types
export type LoginErrorType = 'network' | 'validation' | 'server' | null;

// Form validation types
export type ValidationRule<T = string> = {
  test: (value: T) => boolean;
  message: string;
};

// Form field configuration types
export type FormFieldConfig = {
  key: keyof FormData;
  label: string;
  placeholder: string;
  type?: string;
};

// Component prop types
export interface LoginFormHook {
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  loginState: LoginState;
  handleInputChange: (
    field: keyof FormData,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface LoginFormProps {
  formHook: LoginFormHook;
}

export interface MessageAlertProps {
  loginState: LoginFormHook['loginState'];
}

export interface FormFieldRendererProps {
  config: FormFieldConfig;
  formData: LoginFormHook['formData'];
  errors: LoginFormHook['errors'];
  handleInputChange: LoginFormHook['handleInputChange'];
}
