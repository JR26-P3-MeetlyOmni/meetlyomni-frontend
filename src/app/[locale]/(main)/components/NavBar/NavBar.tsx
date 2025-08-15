'use client';

import Image from 'next/image';
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
    //TODO: Implement real Sign In flow with form validation and backend API
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
          <NavLink key={link.href}>{link.label}</NavLink>
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
