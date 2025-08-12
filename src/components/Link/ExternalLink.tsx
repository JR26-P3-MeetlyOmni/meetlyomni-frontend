'use client';

import NextLink from 'next/link';

import Link from '@mui/material/Link';

import type { ExternalLinkProps } from './types';

const ExternalLink = ({
  href,
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
  ariaLabel,
  className,
}: ExternalLinkProps) => {
  return (
    <Link
      component={NextLink}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </Link>
  );
};

export default ExternalLink;
