'use client';

import { HeroSectionData } from '@/constants/HeroSectionData';

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
      <RightDecoration />
    </HeroSectionWrapper>
  );
};

export default HeroSection;
