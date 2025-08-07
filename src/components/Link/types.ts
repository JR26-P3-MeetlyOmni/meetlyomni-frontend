import type { ReactNode } from 'react';

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
}
