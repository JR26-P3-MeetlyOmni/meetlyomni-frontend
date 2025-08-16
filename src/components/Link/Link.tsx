'use client';

import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import type { ExternalLinkProps, InternalLinkProps } from './types';

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

// 通过login page 里的forget password & signup 链接，
// 发现内部链接的CSS 有几个共同的样式
// 这里定义了内部链接的样式，并导出为StyledInternalLink
const StyledInternalLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-roboto)',
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
  },
})) as typeof Link;

const InternalLink = ({ href, children, className, variant = 'body2' }: InternalLinkProps) => {
  return (
    <StyledInternalLink
      component={NextLink}
      href={href}
      className={className}
      variant={variant}
    >
      {children}
    </StyledInternalLink>
  );
};


export { ExternalLink, InternalLink };
