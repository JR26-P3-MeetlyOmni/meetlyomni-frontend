import React from 'react';

import { Avatar, Box, styled, Typography } from '@mui/material';

import type { AnimatedTestimonialCardProps } from '../types';

const AnimatedTestimonialCardWrapper = styled(Box)<{ cardPosition: string }>(
  ({ cardPosition, theme }) => ({
    width: theme.spacing(64),
    height: theme.spacing(40),
    margin: `${theme.spacing(10)} 0`,
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
    transition: 'all 0.7s cubic-bezier(.77,0,.18,1)',
    transform:
      cardPosition === 'center'
        ? 'scale(1.08) translateY(-10px)'
        : cardPosition === 'left'
          ? 'translateX(-60px) scale(0.95)'
          : cardPosition === 'right'
            ? 'translateX(60px) scale(0.95)'
            : 'scale(0.95)',
    zIndex: cardPosition === 'center' ? 2 : 1,
    boxShadow: cardPosition === 'center' ? theme.shadows[4] : theme.shadows[1],
    color: cardPosition === 'center' ? theme.palette.common.white : theme.palette.text.primary,
    backgroundColor:
      cardPosition === 'center' ? theme.palette.primary.main : theme.palette.background.paper,
    '&::after':
      cardPosition === 'left'
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            borderRadius: theme.spacing(2),
            background: `linear-gradient(to left, transparent 10%, ${theme.palette.common.white} 100%)`,
            transition: 'background 0.7s cubic-bezier(.77,0,.18,1)',
          }
        : cardPosition === 'right'
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              borderRadius: theme.spacing(2),
              background: `linear-gradient(to right,transparent 10%,${theme.palette.common.white} 100%)`,
              transition: 'background 0.7s cubic-bezier(.77,0,.18,1)',
            }
          : {},
  }),
);

const StyledContent = styled('p')(({ theme }) => ({
  width: theme.spacing(54),
  height: theme.spacing(14),
  margin: `0 0 ${theme.spacing(11)}`,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.body1.lineHeight,
  textAlign: 'left',
}));

const StyledPersonalInfo = styled('div')(({ theme }) => ({
  width: theme.spacing(21),
  height: theme.spacing(5),
  display: 'flex',
}));

const StyledNameCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
}));

const StyledName = styled(Typography)<{ cardPosition: string }>(({ cardPosition, theme }) => ({
  fontSize: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.body1.lineHeight,
  textAlign: 'left',
  color: cardPosition === 'center' ? theme.palette.common.white : theme.palette.text.primary,
}));

const StyledRole = styled(Typography)<{ cardPosition: string }>(({ cardPosition, theme }) => ({
  width: theme.spacing(18),
  height: theme.spacing(2),
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body1.lineHeight,
  textAlign: 'left',
  color: cardPosition === 'center' ? theme.palette.common.white : theme.palette.text.primary,
  opacity: cardPosition === 'center' ? 0.8 : 1,
}));

const AnimatedTestimonialCard: React.FC<AnimatedTestimonialCardProps> = ({
  animatedTestimonial: { position, name, role, content, avatarUrl },
}) => (
  <AnimatedTestimonialCardWrapper cardPosition={position}>
    <StyledContent>{content}</StyledContent>
    <StyledPersonalInfo>
      <Avatar src={avatarUrl} alt={name} />
      <StyledNameCard>
        <StyledName cardPosition={position}>{name}</StyledName>
        <StyledRole cardPosition={position}>{role}</StyledRole>
      </StyledNameCard>
    </StyledPersonalInfo>
  </AnimatedTestimonialCardWrapper>
);

export default AnimatedTestimonialCard;
