'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import type { SocialIconProps, SocialLink } from '../types';

// Styled Components using MUI theme
const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5), // 12px
}));

const SocialIconBox = styled(Box)(({ theme }) => ({
  width: theme.spacing(4), // 32px
  height: theme.spacing(4), // 32px
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s ease',

  '&:hover': {
    opacity: 0.8,
  },
}));

// Table-driven social links mapping
const socialLinks: SocialLink[] = [
  {
    href: URL_CONFIG.linkedin,
    label: 'LinkedIn',
    backgroundColor: '#0077B5',
    icon: () => <LinkedInIcon style={{ color: 'white', width: 22, height: 22 }} />,
  },
  {
    href: URL_CONFIG.twitter,
    label: 'Twitter',
    backgroundColor: '#1DA1F2',
    icon: () => <TwitterIcon style={{ color: 'white', width: 22, height: 22 }} />,
  },
];

// Table-driven content mapping
const socialIconContent = {
  link: ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <Link component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </Link>
  ),
  box: ({ backgroundColor, children }: { backgroundColor: string; children: React.ReactNode }) => (
    <SocialIconBox style={{ backgroundColor }}>
      {children}
    </SocialIconBox>
  ),
};

// SocialIcon component
function SocialIcon({ href, label, backgroundColor, children }: SocialIconProps) {
  return socialIconContent.link({ href, label, children: 
    socialIconContent.box({ backgroundColor, children })
  });
}

// SocialIcons component
export default function SocialIcons() {
  return (
    <SocialIconsContainer>
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
    </SocialIconsContainer>
  );
}
