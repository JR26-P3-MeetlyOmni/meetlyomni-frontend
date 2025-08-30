import React from 'react';

import { Box, Container } from '@mui/material';

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
        <Box
          component="h1"
          sx={{
            display: 'inline-block',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            typography: 'h4',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            margin: 0,
          }}
        >
          Welcome to Omni!
        </Box>
        <Box
          component="h2"
          sx={{
            color: 'text.primary',
            typography: 'h5',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            margin: 0,
          }}
        >
          Let&apos;s Sign in Your Profile
        </Box>
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
