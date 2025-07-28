'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Container, Link, Typography } from '@mui/material';

const LegalLinks = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
    <Link
      href="#"
      color="inherit"
      sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
    >
      Privacy Policy
    </Link>
    <Typography
      component="span"
      sx={{ mx: '12px', color: 'rgba(136, 142, 152, 1)', fontSize: '14px' }}
    >
      ｜
    </Typography>
    <Link
      href="#"
      color="inherit"
      sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
    >
      Terms for Usage
    </Link>
  </Box>
);

type SocialIconProps = {
  href: string;
  label: string;
  backgroundColor: string;
  children: ReactNode;
};

const SocialIcon = ({ href, label, backgroundColor, children }: SocialIconProps) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': { opacity: 0.8 },
      }}
    >
      {children}
    </Box>
  </Link>
);

const socialLinks = [
  {
    href: 'https://www.linkedin.com',
    label: 'LinkedIn',
    backgroundColor: '#0077B5',
    icon: () => <LinkedInIcon sx={{ color: 'white', width: 16, height: 16 }} />,
  },
  {
    href: 'https://www.twitter.com',
    label: 'Twitter',
    backgroundColor: '#1DA1F2',
    icon: () => <TwitterIcon sx={{ color: 'white', width: 16, height: 16 }} />,
  },
];

const SocialIcons = () => (
  <Box sx={{ display: 'flex', gap: '12px' }}>
    {socialLinks.map(link => (
      <SocialIcon
        key={link.label}
        href={link.href}
        label={link.label}
        backgroundColor={link.backgroundColor}
      >
        {link.icon()}
      </SocialIcon>
    ))}
  </Box>
);

const FooterLeft = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: { xs: 'center', md: 'flex-start' },
    }}
  >
    <Box sx={{ mb: '55px' }}>
      <Image src="/images/footer/footer_logo.png" alt="Omni Logo" width={126} height={36} />
    </Box>
    <LegalLinks />
    <SocialIcons />
  </Box>
);

const QrCode = ({ label }: { label: string }) => (
  <Box textAlign="center">
    <Typography sx={{ fontSize: '14px', mb: '12px' }}>{label}</Typography>
    <Box sx={{ width: 80, height: 80, bgcolor: 'white', borderRadius: '4px', p: '8px' }}>
      <Box sx={{ width: 64, height: 64, bgcolor: 'rgb(216, 216, 216)' }} />
    </Box>
  </Box>
);

const FooterRight = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: { xs: 'center', md: 'flex-end' },
      gap: '44px',
      flexWrap: 'wrap',
    }}
  >
    <QrCode label="Wechat" />
    <QrCode label="Contact Us" />
  </Box>
);

const FooterBottom = () => (
  <Box sx={{ pt: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
    <Typography sx={{ textAlign: 'center', fontSize: '12px', color: 'rgba(136, 142, 152, 1)' }}>
      © 2025 Meetly Omni. All rights reserved.
    </Typography>
  </Box>
);

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(22, 23, 31, 1)',
        color: 'white',
        py: '60px',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: '60px',
          }}
        >
          <FooterLeft />
          <FooterRight />
        </Box>
        <FooterBottom />
      </Container>
    </Box>
  );
};

export default Footer; 