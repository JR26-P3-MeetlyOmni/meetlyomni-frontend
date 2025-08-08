'use client';

import Image from 'next/image';

import { Box, styled } from '@mui/material';

import { HeroSectionDecorLeft, HeroSectionDecorRight } from './HeroSectionPics';

const PictureBase = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const LeftPicture = styled(PictureBase)(({ theme }) => ({
  left: theme.spacing(0),
}));

const RightPicture = styled(PictureBase)(({ theme }) => ({
  right: theme.spacing(0),
  bottom: theme.spacing(10),
}));

export const LeftDecoration = () => (
  <LeftPicture>
    <Image
      src={HeroSectionDecorLeft.imageUrl}
      alt="Hero section decoration"
      width={238}
      height={646}
      style={{ objectFit: 'contain' }}
    />
  </LeftPicture>
);

export const RightDecoration = () => (
  <RightPicture>
    <Image
      src={HeroSectionDecorRight.imageUrl}
      alt="Hero section decoration"
      width={566}
      height={636}
      style={{ objectFit: 'contain' }}
    />
  </RightPicture>
);
