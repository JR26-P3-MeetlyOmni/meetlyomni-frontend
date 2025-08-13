'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

const StickyNavbarWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  padding: theme.spacing(2, 4),
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.appBar,
  marginBottom: theme.spacing(10),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&.scrolled': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1.5),
  marginLeft: theme.spacing(20),
  '& img': {
    width: theme.spacing(16),
    height: theme.spacing(4.5),
    objectFit: 'contain',
    transition: theme.transitions.create('width'),
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: theme.spacing(2),
    '& img': {
      width: theme.spacing(14),
    },
  },
}));

const NavLinksWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: theme.spacing(7),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(6),
  },
}));

const NavLink = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2),
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor: theme.palette.text.primary,
    textDecorationThickness: theme.spacing(0.3),
    textUnderlineOffset: theme.spacing(1),
  },
}));

const ButtonGroupWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginRight: theme.spacing(20),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(2),
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.spacing(1.75),
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightRegular,
  width: theme.spacing(13),
  height: theme.spacing(4.75),
  padding: theme.spacing(1.25),
  borderRadius: theme.spacing(1),
  letterSpacing: 0.5,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.8),
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: 2,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.08),
      transform: 'translateY(-2px)',
      borderWidth: 1,
    },
  },
}));

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <StickyNavbarWrapper>
      {/* Logo */}
      <LogoWrapper>
        <Image src={Logo} alt="Omni Logo" />
      </LogoWrapper>

      {/* Nav Links */}
      <NavLinksWrapper>
        <NavLink>Home</NavLink>
        <NavLink>Contact Us</NavLink>
      </NavLinksWrapper>

      {/* Buttons */}
      <ButtonGroupWrapper>
        <CTAButton variant="outlined">Sign In</CTAButton>
        <CTAButton variant="contained">Get Started</CTAButton>
      </ButtonGroupWrapper>
    </StickyNavbarWrapper>
  );
};

export default NavBar;
