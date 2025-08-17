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

export interface DecorativeContainerProps {
  zIndex?: number;
  opacity?: number;
}

export interface ResponsiveImageWrapperProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  imageWidth: string;
  imageHeight?: string;
  transform?: string;
}

// Data-driven image configuration types
export interface ImagePosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export interface ImageStyles {
  zIndex: number;
  opacity?: number;
  imageWidth: string;
  imageHeight?: string;
}

export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: ImagePosition;
  styles: ImageStyles;
  testId: string;
}
