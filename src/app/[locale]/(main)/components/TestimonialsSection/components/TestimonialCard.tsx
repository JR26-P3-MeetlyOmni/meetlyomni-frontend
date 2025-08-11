import React from 'react';

import { Avatar, Box, styled, Typography } from '@mui/material';

import type { TestimonialCardProps } from '../types';

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial: { name, role, content, avatarUrl },
}) => {
  const TestimonialCardWrapper = styled(Box)(({ theme }) => ({
    width: theme.spacing(64),
    height: theme.spacing(40),
    margin: `${theme.spacing(10)} 0`,
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  }));

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

  const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: theme.typography.body1.lineHeight,
    textAlign: 'left',
  }));

  const StyledRole = styled(Typography)(({ theme }) => ({
    width: theme.spacing(18),
    height: theme.spacing(2),
    fontSize: theme.spacing(1.5),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: theme.typography.body1.lineHeight,
    color: theme.palette.text.secondary,
    textAlign: 'left',
  }));

  return (
    <TestimonialCardWrapper>
      <StyledContent>{content}</StyledContent>
      <StyledPersonalInfo>
        <Avatar src={avatarUrl} alt={name} />
        <StyledNameCard>
          <StyledName>{name}</StyledName>
          <StyledRole>{role}</StyledRole>
        </StyledNameCard>
      </StyledPersonalInfo>
    </TestimonialCardWrapper>
  );
};

export default TestimonialCard;
