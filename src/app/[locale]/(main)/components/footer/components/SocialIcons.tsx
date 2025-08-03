'use client';

import { URL_CONFIG } from '@/config/footer_external_links';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import type { SocialIconProps, SocialLink } from '../types';

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
  backgroundColor: '#1DA1F2',

  '&:hover': {
    opacity: 0.8,
  },
}));

const StyledLinkedInIcon = styled(LinkedInIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  width: theme.spacing(2.75), // 22px
  height: theme.spacing(2.75), // 22px
}));

const StyledTwitterIcon = styled(TwitterIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  width: theme.spacing(2.75), // 22px
  height: theme.spacing(2.75), // 22px
}));

const socialLinks: SocialLink[] = [
  {
    href: URL_CONFIG.linkedin,
    label: 'LinkedIn',
    icon: () => <StyledLinkedInIcon />,
  },
  {
    href: URL_CONFIG.twitter,
    label: 'Twitter',
    icon: () => <StyledTwitterIcon />,
  },
];

const socialIconContent = {
  link: ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <Link component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </Link>
  ),
  box: ({ children }: { children: React.ReactNode }) => <SocialIconBox>{children}</SocialIconBox>,
};

function SocialIcon({ href, label, children }: Omit<SocialIconProps, 'backgroundColor'>) {
  return socialIconContent.link({ href, label, children: socialIconContent.box({ children }) });
}

export default function SocialIcons() {
  return (
    <SocialIconsContainer>
      {socialLinks.map(link => (
        <SocialIcon key={link.label} href={link.href} label={link.label}>
          {link.icon()}
        </SocialIcon>
      ))}
    </SocialIconsContainer>
  );
}
