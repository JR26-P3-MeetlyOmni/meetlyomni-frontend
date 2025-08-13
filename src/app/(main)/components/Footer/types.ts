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

export interface FooterLinksConfig {
  readonly privacy: string;
  readonly terms: string;
  readonly contact: string;
  readonly wechat: string;
  readonly linkedin: string;
  readonly twitter: string;
}
