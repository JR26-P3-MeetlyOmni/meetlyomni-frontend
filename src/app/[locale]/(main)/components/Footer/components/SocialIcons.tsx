'use client';

import { URL_CONFIG } from '@/constant/footer_external_links';

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

function SocialIcon({ href, label, children }: Omit<SocialIconProps, 'backgroundColor'>) {
  return (
    <Link component="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <SocialIconBox>{children}</SocialIconBox>
    </Link>
  );
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
