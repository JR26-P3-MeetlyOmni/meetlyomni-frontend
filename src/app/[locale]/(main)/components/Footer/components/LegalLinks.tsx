'use client';

import { URL_CONFIG } from '@/constant/footer_external_links';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import type { LegalLinkProps, LegalLinksProps } from '../types';

const LegalLinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2.5), // 20px
}));

const LegalLinkSeparator = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 1.5), // 0 12px
  color: theme.palette.common.white,
  fontSize: theme.typography.body2.fontSize,
}));

const StyledLegalLink = styled(Link)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  textDecoration: 'none',
  color: theme.palette.common.white,

  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
}));

const legalLinks = {
  privacy: {
    href: URL_CONFIG.privacy,
    key: 'privacyPolicy',
  },
  terms: {
    href: URL_CONFIG.terms,
    key: 'termsForUsage',
  },
};

function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <StyledLegalLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLegalLink>
  );
}

export default function LegalLinks({ t }: LegalLinksProps) {
  return (
    <LegalLinksContainer>
      <LegalLink href={legalLinks.privacy.href}>{t(legalLinks.privacy.key)}</LegalLink>
      <LegalLinkSeparator>｜</LegalLinkSeparator>
      <LegalLink href={legalLinks.terms.href}>{t(legalLinks.terms.key)}</LegalLink>
    </LegalLinksContainer>
  );
}
