import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export type TranslationFunction = ReturnType<typeof useTranslations>;

export interface ContactLinkProps {
  href: string;
  label: string;
  t: (key: string) => string;
}

export interface LegalLinksProps {
  t: (key: string) => string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: () => ReactNode;
}
