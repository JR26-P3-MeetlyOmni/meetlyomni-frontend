'use client';

import Image from 'next/image';
import React from 'react';

import { Box, styled } from '@mui/material';

import heroSectionLeftPic from '@assets/images/HeroSection/hero_section_left.png';
import heroSectionRitePic from '@assets/images/HeroSection/hero_section_right.png';

const Pictures = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const LeftPicture = styled(Pictures)(({ theme }) => ({
  left: 0,
  top: theme.spacing(2),
  width: theme.spacing(30),
  height: `calc(${theme.spacing(30)} * 2.71)`,
}));

const RightPicture = styled(Pictures)(({ theme }) => ({
  right: 0,
  bottom: theme.spacing(20),
  width: theme.spacing(67),
  height: `calc(${theme.spacing(71)} * 1.12)`,
}));

const StyledImage = styled(Image)({
  objectFit: 'contain',
});

export const LeftDecoration = () => (
  <LeftPicture>
    <StyledImage src={heroSectionLeftPic} alt="Hero section left decoration" fill />
  </LeftPicture>
);

export const RightDecoration = () => (
  <RightPicture>
    <StyledImage src={heroSectionRitePic} alt="Hero section right decoration" fill />
  </RightPicture>
);
