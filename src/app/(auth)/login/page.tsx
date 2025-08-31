import React from 'react';

import { Box, Container, Typography } from '@mui/material';

import { ClientSignInForm } from './components/ClientSignInForm';
import { DecorativeElements } from './components/DecorativeElements';

function SignInTitle() {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
          flexDirection: 'column',
          '@media (min-width: 900px)': {
            flexWrap: 'nowrap',
            flexDirection: 'row',
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            margin: 0,
          }}
        >
          Welcome to Omni!
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            margin: 0,
          }}
        >
          Let&apos;s Sign in Your Profile
        </Typography>
      </Box>
    </Box>
  );
}

export default function SigninPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DecorativeElements />
      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 3,
          marginTop: { xs: 12.5, sm: 18.75, md: 25, lg: 31.25 },
        }}
      >
        <SignInTitle />
        <ClientSignInForm />
      </Container>
    </Box>
  );
}
