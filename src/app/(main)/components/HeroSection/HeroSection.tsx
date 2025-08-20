'use client';

import { HeroSectionData } from '@/constants/HeroSectionData';

import React from 'react';

import heroSectionLeftPic from '@assets/images/HeroSection/hero_section_left.png';
import heroSectionRitePic from '@assets/images/HeroSection/hero_section_right.png';

import {
  ContentWrapper,
  CTAButton,
  HeroCTAWrapper,
  HeroDescription,
  HeroSectionWrapper,
  HeroTitle,
  LeftPicture,
  RightPicture,
  StyledImage,
} from './HeroSection.style';

const HeroSection: React.FC = () => {
  return (
    <HeroSectionWrapper>
      <LeftPicture>
        <StyledImage src={heroSectionLeftPic} alt="Hero section left decoration" fill />
      </LeftPicture>
      <ContentWrapper>
        <HeroTitle>{HeroSectionData.title}</HeroTitle>
        <HeroDescription>{HeroSectionData.description}</HeroDescription>
        <HeroCTAWrapper>
          {HeroSectionData.buttons.map((btn, idx) => (
            <CTAButton key={idx} variant={btn.variant}>
              {btn.label}
            </CTAButton>
          ))}
        </HeroCTAWrapper>
      </ContentWrapper>
      <RightPicture>
        <StyledImage src={heroSectionRitePic} alt="Hero section right decoration" fill />
      </RightPicture>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
