export interface PasswordStepProps {
  onBack: () => void;
  onPasswordChange?: (password: string, isValid: boolean) => void;
  onNext: () => void;
  password?: string;
}
