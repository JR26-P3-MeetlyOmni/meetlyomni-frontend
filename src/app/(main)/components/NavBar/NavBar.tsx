'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import Logo from '@assets/images/navbar/nav_bar_logo.png';
import DefaultAvatar from '@assets/images/navbar/user_avatar.png';

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
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  //TODO: In the future the user info should be store in the redux

  const navLinks: NavLinkItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const handleScroll = () => setScrolled(window.scrollY > 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = useCallback(() => {
    //TODO: in the future we should store this state in the redux
    setIsLoggedIn(true);
    setUser({ username: 'Alex Li', avatar: DefaultAvatar });
  }, []);

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
