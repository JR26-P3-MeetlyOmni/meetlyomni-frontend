export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  faqItems?: FaqItem[];
  title?: string;
  className?: string;
}

export interface FaqAccordionItemProps {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}
