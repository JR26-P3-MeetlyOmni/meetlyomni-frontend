export interface ImageConfig {
    src: string;
    alt: string;
    width: number;
    height: number;
    position: ImagePosition;
    styles: ImageStyles;
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

export interface DecorativeContainerProps {
    zIndex?: number;
    opacity?: number;
  }

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
  
export interface NewPasswordFormProps {
    token: string;
}

export interface PasswordValidation {
    minLength: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    match: boolean;
}

export interface PasswordValidationRulesProps {
  isLengthOk: boolean;
  isCaseOk: boolean;
  isNumSpecialOk: boolean;
  hasInput: boolean;
  isStrong: boolean;
}

export interface PasswordFieldProps {
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  onPasswordChange: (password: string) => void;
  onToggleVisibility: () => void;
}

export interface PasswordFormFieldsProps {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  validation: PasswordValidation;
  showValidation: boolean;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

export interface ConfirmPasswordFieldProps {
  confirmPassword: string;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  hasError: boolean;
  errorMessage: string;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onToggleVisibility: () => void;
}