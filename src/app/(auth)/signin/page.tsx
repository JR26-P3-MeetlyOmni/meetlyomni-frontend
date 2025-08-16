'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { DecorativeElements } from './components/DecorativeElements';
import { SignInForm } from './components/SignInForm';
import { useSignInForm } from './hooks/useSignInForm';
import { useTheme } from '@mui/material/styles';

export default function SigninPage() {
  const theme = useTheme();
  const {
    formData,
    errors,
    showPassword,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleInputBlur,
    handleSubmit,
    setShowPassword,
  } = useSignInForm();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DecorativeElements />

      <Container maxWidth="sm" sx={{ 
        position: 'relative', 
        zIndex: 3,
        marginTop: { xs: theme.spacing(12.5), sm: theme.spacing(18.75), md: theme.spacing(25), lg: theme.spacing(31.25) },
      }}>
        {/* Title with blue background for "Welcome to Omni!" */}
        <Box sx={{ textAlign: 'center', mb: theme.spacing(4) }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: theme.spacing(2), 
            flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap', lg: 'nowrap', xl: 'nowrap' },
            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
          }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                display: 'inline-block',
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                px: theme.spacing(2),
                py: theme.spacing(0.5),
                borderRadius: theme.shape.borderRadius,
                ...theme.typography.h4,
                fontWeight: theme.typography.fontWeightBold,
                whiteSpace: 'nowrap',
              }}
            >
              Welcome to Omni!
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: theme.palette.text.primary,
                ...theme.typography.h5,
                fontWeight: theme.typography.fontWeightBold,
                whiteSpace: 'nowrap',
              }}
            >
              Let's Sign in Your Profile
            </Typography>
          </Box>
        </Box>

        <SignInForm
          formData={formData}
          errors={errors}
          showPassword={showPassword}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          handleInputChange={handleInputChange}
          handleInputBlur={handleInputBlur}
          handleSubmit={handleSubmit}
          setShowPassword={setShowPassword}
        />
      </Container>
    </Box>
  );
}
  