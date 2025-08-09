'use client';

import Image from 'next/image';
import React from 'react';

import { Box, styled } from '@mui/material';

import { HeroSectionDecorLeft, HeroSectionDecorRight } from './HeroSectionPics';

const LeftPicture = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: theme.spacing(10), // 上移
  zIndex: 0,
  width: theme.spacing(30), // 宽度固定
  height: `calc(${theme.spacing(30)} * 2.71)`, // 根据比例计算高度
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const RightPicture = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  bottom: theme.spacing(14), // 下移
  zIndex: 0,
  width: theme.spacing(71), // 宽度固定
  height: `calc(${theme.spacing(71)} * 1.12)`, // 根据比例计算高度
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const LeftDecoration = () => (
  <LeftPicture>
    <Image
      src={HeroSectionDecorLeft.imageUrl}
      alt="Hero section left decoration"
      fill
      style={{ objectFit: 'contain' }}
    />
  </LeftPicture>
);

export const RightDecoration = () => (
  <RightPicture>
    <Image
      src={HeroSectionDecorRight.imageUrl}
      alt="Hero section right decoration"
      fill
      style={{ objectFit: 'contain' }}
    />
  </RightPicture>
);
