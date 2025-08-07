'use client';

import ExternalLink from '@/components/Link';
import { URL_CONFIG } from '@/constants/footer_external_links';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import type { LegalLinksProps } from '../types';

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

const StyledLegalLink = styled(ExternalLink)(({ theme }) => ({
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

const LegalLink = ({ t }: LegalLinksProps) => {
  return (
    <LegalLinksContainer>
      <StyledLegalLink href={legalLinks.privacy.href}>{t(legalLinks.privacy.key)}</StyledLegalLink>

      <LegalLinkSeparator>｜</LegalLinkSeparator>

      <StyledLegalLink href={legalLinks.terms.href}>{t(legalLinks.terms.key)}</StyledLegalLink>
    </LegalLinksContainer>
  );
};

export default LegalLink;
