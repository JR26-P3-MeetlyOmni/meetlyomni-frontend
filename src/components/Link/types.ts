import type { ReactNode } from 'react';

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
}

export interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'body1' | 'body2' | 'caption';
}