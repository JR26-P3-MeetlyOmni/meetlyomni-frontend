import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

// Translation function type
export type TranslationFunction = ReturnType<typeof useTranslations>;

// ContactLink component props
export interface ContactLinkProps {
  href: string;
  label: string;
  t: (key: string) => string;
}

// LegalLinks component props
export interface LegalLinksProps {
  t: (key: string) => string;
}

// LegalLink component props
export interface LegalLinkProps {
  href: string;
  children: ReactNode;
}

// SocialIcon component props
export interface SocialIconProps {
  href: string;
  label: string;
  backgroundColor: string;
  children: ReactNode;
}

// Social link data structure
export interface SocialLink {
  href: string;
  label: string;
  backgroundColor: string;
  icon: () => ReactNode;
}
