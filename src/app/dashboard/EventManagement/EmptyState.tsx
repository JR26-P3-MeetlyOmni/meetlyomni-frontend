'use client';

import { getAssetUrl } from '@/utils/cdn';

import Image from 'next/image';
import React from 'react';

import { Add } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const EmptyState = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <StyledEmptyPaper elevation={0}>
      <Stack spacing={3} alignItems="center">
        <Image
          src={getAssetUrl('StaticFiles/assets/images/EventManagement/background.png')}
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

        <StyledCreateButton variant="contained" startIcon={<Add />} onClick={onCreateClick}>
          Create
        </StyledCreateButton>
      </Stack>
    </StyledEmptyPaper>
  );
};

export default EmptyState;
