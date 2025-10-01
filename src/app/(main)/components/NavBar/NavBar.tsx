'use client';

import { selectIsAuthenticated } from '@/features/auth/authSelectors';
import { useAppSelector } from '@/store/hooks';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

import DashboardUserMenu from './components/DashboardUserMenu';
import {
  ButtonGroupWrapper,
  CTAButton,
  LogoWrapper,
  NavLink,
  NavLinksWrapper,
  StickyNavbarWrapper,
} from './NavBar.styles';
import { NavLinkItem } from './type';

const NavBar: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const navLinks: NavLinkItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  const handleScroll = () => setScrolled(window.scrollY > 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleGetStartedClick = useCallback(() => {
    router.push('/signup');
  }, [router]);

  return (
    <StickyNavbarWrapper className={scrolled ? 'scrolled' : ''}>
      <LogoWrapper>
        <Image src={Logo} alt="Omni Logo" width={0} height={0} />
      </LogoWrapper>

      <NavLinksWrapper>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            <NavLink as="span">{link.label}</NavLink>
          </Link>
        ))}
      </NavLinksWrapper>

      <ButtonGroupWrapper>
        {!isAuthenticated ? (
          <>
            <CTAButton variant="outlined" onClick={handleSignInClick}>
              Sign In
            </CTAButton>
            <CTAButton variant="contained" onClick={handleGetStartedClick}>
              Get Started
            </CTAButton>
          </>
        ) : (
          <DashboardUserMenu />
        )}
      </ButtonGroupWrapper>
    </StickyNavbarWrapper>
  );
};

export default NavBar;
