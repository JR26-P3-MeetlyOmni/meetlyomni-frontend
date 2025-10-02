export interface ContactInfoStepProps {
  onBack: () => void;
  onNext: () => void;
  onChange?: (name: string, phone: string, valid: boolean) => void;
  contactName?: string;
  phone?: string;
}
