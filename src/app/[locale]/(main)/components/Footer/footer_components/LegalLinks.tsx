'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { urlConfig } from '@/config/footer_external_links';
import type { LegalLinksProps, LegalLinkProps } from '../types';

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
      <LegalLink href={urlConfig.privacy}>{t('privacyPolicy')}</LegalLink>
      <span className="legal-link-separator">｜</span>
      <LegalLink href={urlConfig.terms}>{t('termsForUsage')}</LegalLink>
    </Box>
  );
}
