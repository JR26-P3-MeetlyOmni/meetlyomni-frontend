export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureData {
  imageUrl: string;
  title: string;
  description: string;
}

export interface FaqAccordionProps {
  faqItems?: FaqItem[];
  title?: string;
  className?: string;
  data?: FeatureData[];
  type?: string;
}

export interface FaqAccordionItemProps {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}
