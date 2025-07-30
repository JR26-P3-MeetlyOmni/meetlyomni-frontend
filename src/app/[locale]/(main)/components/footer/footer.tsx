'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

import ContactLink from './footer_components/ContactLink';
import LegalLinks from './footer_components/LegalLinks';
import SocialIcons from './footer_components/SocialIcons';
import type { TranslationFunction } from './types';

const FooterLeft = ({ t }: { t: TranslationFunction }) => (
  <Box className="footer-left">
    <Box className="footer-logo-container">
      <Image src="/assets/images/footer/footer_logo.png" alt="Omni Logo" width={126} height={36} />
    </Box>
    <LegalLinks t={t} />
    <SocialIcons />
  </Box>
);

const FooterRight = ({ t }: { t: TranslationFunction }) => {
  return (
    <Box className="footer-right">
      <ContactLink href={URL_CONFIG.wechat} label="wechat" t={t} />
      <ContactLink href={URL_CONFIG.contact} label="contactUs" t={t} />
    </Box>
  );
};

const FooterBottom = ({ t }: { t: TranslationFunction }) => {
  return (
    <Box className="footer-bottom">
      <Typography className="footer-copyright">{t('copyright')}</Typography>
    </Box>
  );
};

const Footer = () => {
  const t = useTranslations('common');

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <FooterLeft t={t} />
          <FooterRight t={t} />
        </Box>
        <FooterBottom t={t} />
      </Container>
    </Box>
  );
};

export default Footer;
