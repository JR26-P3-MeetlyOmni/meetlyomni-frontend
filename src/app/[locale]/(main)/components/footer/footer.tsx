'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import footerLogo from '@assets/images/footer/footer_logo.png';

import ContactLink from './footer_components/ContactLink';
import LegalLinks from './footer_components/LegalLinks';
import SocialIcons from './footer_components/SocialIcons';
import type { TranslationFunction } from './types';

// Styled Components using MUI theme
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(22, 23, 31, 1)',
  color: 'white',
  padding: theme.spacing(7.5, 0), // 60px 0
  fontFamily: 'var(--font-roboto), sans-serif',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: theme.spacing(4), // 32px
  marginBottom: theme.spacing(7.5), // 60px

  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
}));

const FooterLeft = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
}));

const FooterLogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6.875), // 55px
}));

const FooterRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(5.5), // 44px
  flexWrap: 'wrap',

  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3.75), // 30px
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
}));

const FooterCopyright = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.7)',
}));

// Table-driven component mapping
const footerSections = {
  left: ({ t }: { t: TranslationFunction }) => (
    <FooterLeft>
      <FooterLogoContainer>
        <Image src={footerLogo} alt="Omni Logo" width={126} height={36} />
      </FooterLogoContainer>
      <LegalLinks t={t} />
      <SocialIcons />
    </FooterLeft>
  ),
  right: ({ t }: { t: TranslationFunction }) => (
    <FooterRight>
      <ContactLink href={URL_CONFIG.wechat} label="wechat" t={t} />
      <ContactLink href={URL_CONFIG.contact} label="contactUs" t={t} />
    </FooterRight>
  ),
  bottom: ({ t }: { t: TranslationFunction }) => (
    <FooterBottom>
      <FooterCopyright>{t('copyright')}</FooterCopyright>
    </FooterBottom>
  ),
};

const Footer = () => {
  const t = useTranslations('landing_page_footer');

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <FooterContent>
          {footerSections.left({ t })}
          {footerSections.right({ t })}
        </FooterContent>
        {footerSections.bottom({ t })}
      </Container>
    </StyledFooter>
  );
};

export default Footer;
