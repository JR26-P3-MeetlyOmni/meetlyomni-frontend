export interface CompanyNameStepProps {
  onBack?: () => void;
  onCompanyNameChange?: (companyName: string, isValid: boolean) => void;
  onNext?: () => void;
  companyName?: string;
}
