'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { urlConfig } from '@/config/footer_external_links';
import type { SocialIconProps, SocialLink } from '../types';

// SocialIcon component
function SocialIcon({ href, label, backgroundColor, children }: SocialIconProps) {
  return (
    <Link 
      component="a"
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={label}
    >
      <Box 
        className="social-icon-box"
        style={{ backgroundColor }}
      >
        {children}
      </Box>
    </Link>
  );
}

const socialLinks: SocialLink[] = [
  {
    href: urlConfig.linkedin,
    label: 'LinkedIn',
    backgroundColor: '#0077B5',
    icon: () => <LinkedInIcon style={{ color: 'white', width: 22, height: 22 }} />,
  },
  {
    href: urlConfig.twitter,
    label: 'Twitter',
    backgroundColor: '#1DA1F2',
    icon: () => <TwitterIcon style={{ color: 'white', width: 22, height: 22 }} />,
  },
];

// SocialIcons component
export default function SocialIcons() {
  return (
    <Box className="social-icons-container">
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
}
