'use client';

import { URL_CONFIG } from '@/constant/footer_external_links';
import theme from '@/theme';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import footerLogo from '@assets/images/footer/footer_logo.png';

import ContactLink from './components/ContactLink';
import LegalLinks from './components/LegalLinks';
import SocialIcons from './components/SocialIcons';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(7.5, 0), // 60px 0
  fontFamily: theme.typography.fontFamily,
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

const FooterLeft = styled(Box)(() => ({
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
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterCopyright = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.common.white,
}));

const Footer = () => {
  const t = useTranslations('landing_page_footer');

  return (
    <StyledFooter as="footer">
      <Container maxWidth="lg">
        <FooterContent>
          <FooterLeft>
            <FooterLogoContainer>
              <Image src={footerLogo} alt="Omni Logo" width={126} height={36} />
            </FooterLogoContainer>
            <LegalLinks t={t} />
            <SocialIcons />
          </FooterLeft>

          <FooterRight>
            <ContactLink href={URL_CONFIG.wechat} label="wechat" t={t} />
            <ContactLink href={URL_CONFIG.contact} label="contactUs" t={t} />
          </FooterRight>
        </FooterContent>

        <FooterBottom>
          <FooterCopyright>{t('copyright')}</FooterCopyright>
        </FooterBottom>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
