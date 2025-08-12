'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { DecorativeElements } from './components/DecorativeElements';
import { SignInForm } from './components/SignInForm';
import { useSignInForm } from './hooks/useSignInForm';

export default function SigninPage() {
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
        background: '#ffffff',
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
        marginTop: { xs: '100px', sm: '150px', md: '200px', lg: '250px' }
      }}>
        {/* Title with blue background for "Welcome to Omni!" */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 2, 
            flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap', lg: 'nowrap', xl: 'nowrap' },
            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
          }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                display: 'inline-block',
                background: '#1976d2',
                color: '#ffffff',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontFamily: 'Roboto',
                fontSize: '34px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 1,
                letterSpacing: 'normal',
                whiteSpace: 'nowrap',
              }}
            >
              Welcome to Omni!
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: '#333333',
                fontFamily: 'Roboto',
                fontSize: '34px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 1,
                letterSpacing: 'normal',
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
  