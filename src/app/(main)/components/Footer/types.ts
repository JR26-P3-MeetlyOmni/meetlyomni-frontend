import type { ElementType } from 'react';

export interface ContactLinkProps {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: ElementType;
}
