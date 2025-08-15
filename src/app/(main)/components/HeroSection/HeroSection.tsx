'use client';

import React from 'react';

import { LeftDecoration, RightDecoration } from './components/HeroPics';
import {
  ContentWrapper,
  CTAButton,
  HeroCTAWrapper,
  HeroDescription,
  HeroSectionWrapper,
  HeroTitle,
} from './HeroSection.style';

const HeroSection: React.FC = () => {
  return (
    <HeroSectionWrapper>
      <LeftDecoration />
      <ContentWrapper>
        <HeroTitle>
          Enhance Each Activity To Be More Intelligent, Enjoyable, And Productive
        </HeroTitle>
        <HeroDescription>
          Meetly Omni is an interactive platform for corporate events, launches, training sessions
          and community gatherings to make your audience more engaged, interactive and fun!
        </HeroDescription>
        <HeroCTAWrapper>
          <CTAButton variant="contained">Create Activity</CTAButton>
          <CTAButton variant="outlined">Join the Game</CTAButton>
        </HeroCTAWrapper>
      </ContentWrapper>
      <RightDecoration />
    </HeroSectionWrapper>
  );
};

export default HeroSection;
