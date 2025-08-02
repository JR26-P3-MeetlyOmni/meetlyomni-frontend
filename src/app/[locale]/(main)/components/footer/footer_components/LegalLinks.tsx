'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import type { LegalLinkProps, LegalLinksProps } from '../types';

// Styled Components using MUI theme
const LegalLinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2.5), // 20px
}));

const LegalLinkSeparator = styled('span')(({ theme }) => ({
  margin: theme.spacing(0, 1.5), // 0 12px
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '14px',
}));

const StyledLegalLink = styled(Link)(() => ({
  fontSize: '14px',
  textDecoration: 'none',
  color: 'white',

  '&:hover': {
    textDecoration: 'underline',
    color: '#42a5f5',
  },
}));

// Table-driven legal links mapping
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

// Table-driven content mapping
const legalLinksContent = {
  link: ({ href, children }: LegalLinkProps) => (
    <StyledLegalLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLegalLink>
  ),
  separator: () => <LegalLinkSeparator>｜</LegalLinkSeparator>,
};

// LegalLink component
function LegalLink({ href, children }: LegalLinkProps) {
  return legalLinksContent.link({ href, children });
}

// LegalLinks component
export default function LegalLinks({ t }: LegalLinksProps) {
  return (
    <LegalLinksContainer>
      <LegalLink href={legalLinks.privacy.href}>{t(legalLinks.privacy.key)}</LegalLink>
      {legalLinksContent.separator()}
      <LegalLink href={legalLinks.terms.href}>{t(legalLinks.terms.key)}</LegalLink>
    </LegalLinksContainer>
  );
}
