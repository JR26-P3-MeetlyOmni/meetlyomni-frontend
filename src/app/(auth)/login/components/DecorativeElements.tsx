import Image from 'next/image';
import React from 'react';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

// 基础绝对定位组件 - 遵循单一职责原则
const AbsoluteBox = styled(Box)({
  position: 'absolute',
});

// 使用主题系统的装饰元素容器
const DecorativeContainer = styled(AbsoluteBox)<{
  zIndex?: number;
  opacity?: number;
}>(({ zIndex = 1, opacity = 1 }) => ({
  zIndex,
  opacity,
  display: 'block',
}));

// Logo 包装器 - 使用 theme.spacing() 替代硬编码
const LogoWrapper = styled(DecorativeContainer)(({ theme }) => ({
  top: theme.spacing(3), // 替代 '3vh'
  left: theme.spacing(3), // 替代 '3vw'
  zIndex: theme.zIndex.drawer, // 使用主题 zIndex 系统
  [theme.breakpoints.up('sm')]: {
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    top: theme.spacing(5),
    left: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    top: theme.spacing(3.5),
    left: theme.spacing(6),
  },
}));

// 顶部中心草图 - 使用 theme.palette 和 alpha() 处理颜色
const TopCenterSketch = styled(DecorativeContainer)(({ theme }) => ({
  top: theme.spacing(8),
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min(300px, 25vw)',
  height: 'min(180px, 15vh)',
  // 使用主题颜色系统替代硬编码颜色
  backgroundColor: alpha(theme.palette.grey[400], 0.3),
  borderRadius: theme.shape.borderRadius,
  opacity: theme.palette.action.disabledOpacity, // 使用主题透明度
  [theme.breakpoints.up('md')]: {
    width: 'min(350px, 28vw)',
    height: 'min(210px, 17vh)',
  },
}));

// 响应式图片包装器 - 抽象公共样式
const ResponsiveImageWrapper = styled(DecorativeContainer)<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  imageWidth: string;
  imageHeight?: string;
  transform?: string;
}>(({ top, bottom, left, right, imageWidth, imageHeight = 'auto', transform }) => ({
  ...(top && { top }),
  ...(bottom && { bottom }),
  ...(left && { left }),
  ...(right && { right }),
  ...(transform && { transform }),
  '& img': {
    width: imageWidth,
    height: imageHeight,
  },
}));

export const DecorativeElements = () => (
  <>
    <LogoWrapper zIndex={10}>
      <Image src="/assets/images/LogIn/logo.png" alt="Omni Logo" width={105} height={30} />
    </LogoWrapper>

    <TopCenterSketch zIndex={1} />

    <ResponsiveImageWrapper
      top="25vh"
      left="8vw"
      zIndex={1}
      opacity={0.7}
      imageWidth="min(84px, 6vw)"
      imageHeight="min(84px, 6vw)"
    >
      <Image src="/assets/images/LogIn/glass.png" alt="Magnifying glass" width={84} height={84} />
    </ResponsiveImageWrapper>

    <ResponsiveImageWrapper top="15vh" right="8vw" zIndex={2} imageWidth="min(209px, 18vw)">
      <Image src="/assets/images/LogIn/rachel.png" alt="Rachel" width={209.3} height={97.2} />
    </ResponsiveImageWrapper>

    <ResponsiveImageWrapper bottom="20vh" left="8vw" zIndex={2} imageWidth="min(209px, 18vw)">
      <Image src="/assets/images/LogIn/mark.png" alt="Mark" width={209.3} height={97.2} />
    </ResponsiveImageWrapper>

    <ResponsiveImageWrapper
      top="50vh"
      right="12vw"
      zIndex={1}
      opacity={0.8}
      imageWidth="min(179px, 15vw)"
    >
      <Image src="/assets/images/LogIn/lookingFor.png" alt="Looking For" width={179} height={42} />
    </ResponsiveImageWrapper>

    <ResponsiveImageWrapper
      top="12vh"
      left="50%"
      zIndex={1}
      opacity={0.8}
      imageWidth="min(460px, 35vw)"
      transform="translateX(-50%)"
    >
      <Image src="/assets/images/LogIn/form.png" alt="Form" width={460} height={337} />
    </ResponsiveImageWrapper>

    <ResponsiveImageWrapper
      bottom="8vh"
      right="25vw"
      zIndex={1}
      opacity={0.8}
      imageWidth="min(72px, 5vw)"
      imageHeight="min(72px, 5vw)"
    >
      <Image src="/assets/images/LogIn/star.png" alt="Star" width={72} height={72} />
    </ResponsiveImageWrapper>
  </>
);
