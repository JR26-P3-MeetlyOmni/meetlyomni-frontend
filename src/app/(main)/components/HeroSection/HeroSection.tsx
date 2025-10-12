'use client';

import { HeroSectionData } from '@/constants/HeroSectionData';
import { getAssetUrl } from '@/utils/cdn';

import React from 'react';

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
        <StyledImage
          src={getAssetUrl('StaticFiles/assets/images/HeroSection/hero_section_left.png')}
          alt="Hero section left decoration"
          fill
        />
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
        <StyledImage
          src={getAssetUrl('StaticFiles/assets/images/HeroSection/hero_section_right.png')}
          alt="Hero section right decoration"
          fill
        />
      </RightPicture>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
