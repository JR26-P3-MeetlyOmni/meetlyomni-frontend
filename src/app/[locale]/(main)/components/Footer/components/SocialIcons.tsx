'use client';

import ExternalLink from '@/components/Link';
import { URL_CONFIG } from '@/constants/footer_external_links';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import type { ISocialLink } from '../types';

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

const socialLinks: ISocialLink[] = [
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

const SocialIcons = () => {
  return (
    <SocialIconsContainer>
      {socialLinks.map(link => (
        <ExternalLink key={link.label} href={link.href} ariaLabel={link.label}>
          <SocialIconBox>{link.icon()}</SocialIconBox>
        </ExternalLink>
      ))}
    </SocialIconsContainer>
  );
};

export default SocialIcons;
