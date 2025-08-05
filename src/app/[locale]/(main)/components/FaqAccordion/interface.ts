/**
 * Interface for individual FAQ item
 */
export interface FaqItem {
  /** Unique identifier for the FAQ item */
  id: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

/**
 * Props for the main FAQ Accordion component
 */
export interface FaqAccordionProps {
  /** Custom FAQ items array (optional) */
  faqItems?: FaqItem[];
  /** Custom title for the FAQ section (optional) */
  title?: string;
  /** Additional CSS class name (optional) */
  className?: string;
}

/**
 * Props for individual FAQ accordion item
 */
export interface FaqAccordionItemProps {
  /** The FAQ item data */
  item: FaqItem;
  /** Whether this item is currently expanded */
  isExpanded: boolean;
  /** Callback function when item is toggled */
  onToggle: () => void;
  /** Additional CSS class name (optional) */
  className?: string;
}
