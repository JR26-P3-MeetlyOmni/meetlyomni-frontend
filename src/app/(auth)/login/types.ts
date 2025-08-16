export interface SignInFormProps {
    formData: { email: string; password: string };
    errors: { email: string; password: string; auth?: string | null };
    showPassword: boolean;
    isSubmitting: boolean;
    isFormValid: boolean;
    handleInputChange: (field: string, value: string) => void;
    handleInputBlur: (field: string, value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export interface EmailFieldProps {
    value: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  }
  
  export interface PasswordFieldProps {
    value: string;
    error: string;
    showPassword: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onToggleVisibility: () => void;
  }