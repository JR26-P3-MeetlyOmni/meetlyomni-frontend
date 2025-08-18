'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

import React from 'react';

import { styled } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import type { StyledOverlayProps, TestimonialCardProps } from '../types';

const StyledOverlay = styled(Box)<StyledOverlayProps>(({ cardPosition, theme }) => {
  if (cardPosition === 'center') return { display: 'none' };
  return {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 20,
    zIndex: 2,
    background:
      cardPosition === 'left'
        ? `linear-gradient(to left, transparent 10%, ${theme.palette.common.white} 100%)`
        : `linear-gradient(to right, transparent 10%, ${theme.palette.common.white} 100%)`,
    transition: 'background 0.7s cubic-bezier(.77,0,.18,1)',
  };
});

const StyledContent = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(54),
  fontSize: theme.spacing(2.5),
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(8),
}));

const StyledPersonalInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: theme.spacing(5),
}));

const StyledNameCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

const StyledName = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.spacing(2),
  textAlign: 'left',
}));

const StyledRole = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.spacing(1.5),
  textAlign: 'left',
}));

const TestimonialCard: React.FC<TestimonialCardProps & HTMLMotionProps<'div'>> = ({
  data,
  ...props
}) => {
  const { name, role, content, avatarUrl, position } = data;
  const theme = useTheme();
  return (
    <motion.div
      style={{
        width: theme.spacing(55),
        minHeight: theme.spacing(29),
        borderRadius: 20,
        boxShadow:
          position === 'center'
            ? `0 ${theme.spacing(1)} ${theme.spacing(4)} ${theme.palette.primary.main}`
            : `0 ${theme.spacing(0.25)} ${theme.spacing(4)} ${theme.palette.grey[300]}`,
        background:
          position === 'center' ? theme.palette.primary.main : theme.palette.background.paper,
        color:
          position === 'center'
            ? theme.palette.getContrastText(theme.palette.primary.main)
            : theme.palette.text.primary,
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        margin: `0 ${theme.spacing(1)}`,
      }}
      animate={{
        scale: position === 'center' ? 1.08 : 0.95,
      }}
      transition={{ duration: 0.7, type: 'spring' }}
      {...props}
    >
      <StyledOverlay cardPosition={position} />
      <motion.div transition={{ duration: 0.7 }}>
        <StyledContent>{content}</StyledContent>
        <StyledPersonalInfo>
          <StyledAvatar src={avatarUrl} alt={name} />
          <StyledNameCard>
            <StyledName>{name}</StyledName>
            <StyledRole>{role}</StyledRole>
          </StyledNameCard>
        </StyledPersonalInfo>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
