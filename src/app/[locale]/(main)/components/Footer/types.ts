import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export type TranslationFunction = ReturnType<typeof useTranslations>;

export interface IContactLinkProps {
  href: string;
  label: string;
  t: (key: string) => string;
}

export interface ILegalLinksProps {
  t: (key: string) => string;
}

export interface ISocialLink {
  href: string;
  label: string;
  icon: () => ReactNode;
}
