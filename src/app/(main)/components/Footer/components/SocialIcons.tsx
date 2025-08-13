'use client';

import ExternalLink from '@/components/Link';
import { URL_CONFIG } from '@/constants/FooterExternalLinks';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import type { SocialLink } from '../types';

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
    icon: StyledLinkedInIcon,
  },
  {
    href: URL_CONFIG.twitter,
    label: 'Twitter',
    icon: StyledTwitterIcon,
  },
];

const SocialIcons = () => {
  return (
    <SocialIconsContainer>
      {socialLinks.map(link => {
        const Icon = link.icon;
        return (
          <ExternalLink key={link.label} href={link.href} ariaLabel={link.label}>
            <SocialIconBox>
              <Icon />
            </SocialIconBox>
          </ExternalLink>
        );
      })}
    </SocialIconsContainer>
  );
};

export default SocialIcons;
