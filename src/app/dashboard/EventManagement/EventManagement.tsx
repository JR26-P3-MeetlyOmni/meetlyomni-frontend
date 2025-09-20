'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import backgroundImage from '@assets/images/EventManagement/background.png';
import balloonImage from '@assets/images/EventManagement/balloon.png';

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 80px)',
  padding: theme.spacing(3),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));

const StyledNavBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledNavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: 'transparent',
  borderColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  fontWeight: 'normal',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[900],
  },
}));

const StyledEmptyPaper = styled(Paper)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  position: 'relative',
}));

const StyledEmptyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledCreateButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: theme.palette.grey[900],
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}));

function EmptyState() {
  return (
    <StyledEmptyPaper elevation={0}>
      <Stack spacing={3} alignItems="center">
        <Image
          src={backgroundImage}
          alt="Empty state background"
          width={300}
          height={200}
          style={{
            objectFit: 'contain',
          }}
        />

        <StyledEmptyText variant="h6" align="center">
          There&apos;s nothing here, let&apos;s create an Event.
        </StyledEmptyText>

        <StyledCreateButton variant="contained" startIcon={<Add />}>
          Create
        </StyledCreateButton>
      </Stack>
    </StyledEmptyPaper>
  );
}

export default function EventManagement() {
  const [_activeTab, setActiveTab] = useState('interactive');

  const handleInteractiveClick = useCallback(() => setActiveTab('interactive'), []);
  const handleRaffleClick = useCallback(() => setActiveTab('raffle'), []);

  return (
    <StyledContainer>
      {/* Page Title with Balloon */}
      <StyledTitleBox>
        <StyledTitle variant="h4">Event Management</StyledTitle>
        <Image src={balloonImage} alt="Balloon" width={32} height={32} />
      </StyledTitleBox>

      {/* Navigation Tabs */}
      <StyledNavBox>
        <StyledNavButton
          variant="outlined"
          startIcon={<span>💡</span>}
          onClick={handleInteractiveClick}
        >
          Interactive Quiz
        </StyledNavButton>

        <StyledNavButton variant="outlined" startIcon={<span>🎰</span>} onClick={handleRaffleClick}>
          Raffle Game
        </StyledNavButton>
      </StyledNavBox>

      {/* Content Area */}
      <Box style={{ flex: 1 }}>
        <EmptyState />
      </Box>
    </StyledContainer>
  );
}
