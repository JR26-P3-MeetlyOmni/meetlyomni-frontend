'use client';

import { URL_CONFIG } from '@/constant/footer_external_links';

import NextLink from 'next/link';
import React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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

const StyledLegalLink = styled(NextLink)(({ theme }) => ({
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
    label: 'Privacy Policy',
  },
  terms: {
    href: URL_CONFIG.terms,
    label: 'Terms for Usage',
  },
};

const LegalLinks = () => {
  return (
    <LegalLinksContainer>
      <StyledLegalLink href={legalLinks.privacy.href} target="_blank" rel="noopener noreferrer">
        {legalLinks.privacy.label}
      </StyledLegalLink>
      <LegalLinkSeparator>｜</LegalLinkSeparator>
      <StyledLegalLink href={legalLinks.terms.href} target="_blank" rel="noopener noreferrer">
        {legalLinks.terms.label}
      </StyledLegalLink>
    </LegalLinksContainer>
  );
};

export default LegalLinks;
