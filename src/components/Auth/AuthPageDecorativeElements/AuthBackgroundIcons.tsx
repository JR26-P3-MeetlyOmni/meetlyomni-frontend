import React from 'react';

import type { ImageConfig } from '../types';
import { ImageElement } from './AuthBackgroundLayout';

// Logo 配置
const logoConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/logo.png',
  alt: 'Omni Logo',
  width: 105,
  height: 30,
  position: {
    top: '3rem',
    left: '3rem',
  },
  styles: {
    zIndex: 10,
    imageWidth: '105px',
    imageHeight: '30px',
  },
};

// Glass Icon 配置
const glassConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/glass.png',
  alt: 'Magnifying glass',
  width: 84,
  height: 84,
  position: {
    top: '25vh',
    left: '8vw',
  },
  styles: {
    zIndex: 1,
    opacity: 0.7,
    imageWidth: 'min(84px, 6vw)',
    imageHeight: 'min(84px, 6vw)',
  },
};

// Rachel Icon 配置
const rachelConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/rachel.png',
  alt: 'Rachel',
  width: 209.3,
  height: 97.2,
  position: {
    top: '15vh',
    right: '8vw',
  },
  styles: {
    zIndex: 2,
    imageWidth: 'min(209px, 18vw)',
  },
};

// Mark Icon 配置
const markConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/mark.png',
  alt: 'Mark',
  width: 209.3,
  height: 97.2,
  position: {
    bottom: '15vh',
    left: '8vw',
  },
  styles: {
    zIndex: 2,
    imageWidth: 'min(209px, 18vw)',
  },
};

// Looking For Icon 配置
const lookingForConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/looking-for.png',
  alt: 'Looking for',
  width: 300,
  height: 60,
  position: {
    bottom: '8vh',
    right: '8vw',
  },
  styles: {
    zIndex: 3,
    imageWidth: 'min(300px, 25vw)',
  },
};

// Star Icon 配置
const starConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/star.png',
  alt: 'Star',
  width: 60,
  height: 60,
  position: {
    bottom: '4vh',
    right: '12vw',
  },
  styles: {
    zIndex: 4,
    imageWidth: 'min(60px, 5vw)',
    imageHeight: 'min(60px, 5vw)',
  },
};

// Form Background Icon 配置
const formBackgroundConfig: ImageConfig = {
  src: '/assets/images/WelcomeToSignin/form.png',
  alt: 'Form',
  width: 460,
  height: 337,
  position: {
    top: '1.5vh',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  styles: {
    zIndex: 10,
    opacity: 0.8,
    imageWidth: 'min(460px, 35vw)',
  },
};

// 导出所有图标组件
export const Logo = () => <ImageElement config={logoConfig} />;
export const GlassIcon = () => <ImageElement config={glassConfig} />;
export const RachelIcon = () => <ImageElement config={rachelConfig} />;
export const MarkIcon = () => <ImageElement config={markConfig} />;
export const LookingForIcon = () => <ImageElement config={lookingForConfig} />;
export const StarIcon = () => <ImageElement config={starConfig} />;
export const FormBackgroundIcon = () => <ImageElement config={formBackgroundConfig} />;

// 默认导出
const AuthBackgroundIcons = {
  Logo,
  GlassIcon,
  RachelIcon,
  MarkIcon,
  LookingForIcon,
  StarIcon,
  FormBackgroundIcon,
};

export default AuthBackgroundIcons;
