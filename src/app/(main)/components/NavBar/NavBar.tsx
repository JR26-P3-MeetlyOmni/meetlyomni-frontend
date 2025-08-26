'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import Logo from '@assets/images/navbar/nav_bar_logo.png';

import { UserMenu } from './components/UserMenu';
import {
  ButtonGroupWrapper,
  CTAButton,
  LogoWrapper,
  NavLink,
  NavLinksWrapper,
  StickyNavbarWrapper,
} from './NavBar.styles';
import { NavLinkItem, UserInfo } from './type';

const NavBar: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, _setIsLoggedIn] = useState(false);
  const [user, _setUser] = useState<UserInfo | null>(null);
  //TODO: In the future the user info should be store in the redux

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
        {!isLoggedIn ? (
          <>
            <CTAButton variant="outlined" onClick={handleSignInClick}>
              Sign In
            </CTAButton>
            <CTAButton variant="contained">Get Started</CTAButton>
          </>
        ) : (
          <>
            <UserMenu user={user!} />
          </>
        )}
      </ButtonGroupWrapper>
    </StickyNavbarWrapper>
  );
};

export default NavBar;
