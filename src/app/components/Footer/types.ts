import type { ReactNode } from 'react';

export interface ContactLinkProps {
  href: string;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LegalLinksProps {
  // No props needed for this component
}

export interface SocialLink {
  href: string;
  label: string;
  icon: () => ReactNode;
}
