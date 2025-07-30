'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import type { LegalLinkProps, LegalLinksProps } from '../types';

// LegalLink component
function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <Link
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="legal-link"
    >
      {children}
    </Link>
  );
}

// LegalLinks component
export default function LegalLinks({ t }: LegalLinksProps) {
  return (
    <Box className="legal-links-container">
      <LegalLink href={URL_CONFIG.privacy}>{t('privacyPolicy')}</LegalLink>
      <span className="legal-link-separator">｜</span>
      <LegalLink href={URL_CONFIG.terms}>{t('termsForUsage')}</LegalLink>
    </Box>
  );
}
