export interface EmailStepProps {
  onBack: () => void;
  onNext?: () => void;
  onEmailChange?: (email: string, isValid: boolean) => void;
  email?: string;
}
