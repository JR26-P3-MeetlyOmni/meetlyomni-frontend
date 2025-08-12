import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const DecorativeElements = () => (
  <>
    {/* Logo */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '40px', sm: '50px', md: '60px', lg: '35px' }, 
      left: { xs: '20px', sm: '40px', md: '80px', lg: '80px' }, 
      zIndex: 10,
      display: { xs: 'none', sm: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/logo.png" 
        alt="Omni Logo" 
        width={105} 
        height={30} 
        style={{ 
          objectFit: 'contain'
        }} 
      />
    </Box>

    {/* Abstract UI Sketch - Top Center */}
    <Box sx={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
      <Box
        sx={{
          width: 300,
          height: 180,
          backgroundColor: 'rgba(200, 200, 200, 0.3)',
          borderRadius: 2,
          opacity: 0.6,
        }}
      />
    </Box>

    {/* Magnifying Glass - Mid Left */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '10%', sm: '15%', md: '20%', lg: '300px' }, 
      left: { xs: '5%', sm: '8%', md: '10%', lg: '178px' }, 
      zIndex: 1,
      display: { xs: 'none', sm: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/glass.png" 
        alt="Magnifying glass" 
        width={84} 
        height={84} 
        style={{ 
          opacity: 0.7,
          margin: '23.4px 85.6px 13px 92px',
          objectFit: 'contain'
        }} 
      />
    </Box>



    {/* Rachel - Top Right (no speech bubble) */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '20%', sm: '22%', md: '24%', lg: '15%' }, 
      right: { xs: '15%', sm: '18%', md: '20%', lg: 'calc(25% - 100px)' }, 
      zIndex: 2, 
      display: { xs: 'none', lg: 'block' } 
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/rachel.png" 
        alt="Rachel" 
        width={209.3} 
        height={97.2}
      />
    </Box>

    {/* Mark - Bottom Left (no speech bubble) */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '60%', sm: '65%', md: '70%', lg: '600px' }, 
      left: { xs: '5%', sm: '8%', md: '12%', lg: '178px' }, 
      zIndex: 2, 
      display: { xs: 'none', lg: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/mark.png" 
        alt="Mark" 
        width={209.3} 
        height={97.2} 
      />
    </Box>

    {/* Looking For - Mid Right */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '45%', sm: '50%', md: '55%', lg: '45%' }, 
      right: { xs: '15%', sm: '20%', md: '25%', lg: '15%' }, 
      zIndex: 1,
      display: { xs: 'none', sm: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/lookingFor.png" 
        alt="Looking For" 
        width={179} 
        height={42} 
        style={{ 
          opacity: 0.8,
          objectFit: 'contain'
        }} 
      />
    </Box>

    {/* Form - Center */}
    <Box sx={{ 
      position: 'absolute', 
      top: { xs: '70px', sm: '70px', md: '70px', lg: '70px' }, 
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
      display: { xs: 'none', sm: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/form.png" 
        alt="Form" 
        width={460} 
        height={337} 
        style={{ 
          opacity: 0.8,
          objectFit: 'contain'
        }} 
      />
    </Box>

    {/* Star - Bottom Right */}
    <Box sx={{ 
      position: 'absolute', 
      bottom: { xs: '10%', sm: '8%', md: '5%', lg: '15%' }, 
      right: { xs: '5%', sm: '8%', md: '12%', lg: '25%' }, 
      zIndex: 1,
      display: { xs: 'none', sm: 'block' }
    }}>
      <Image 
        src="/assets/images/WelcomeToSignin/star.png" 
        alt="Star" 
        width={72} 
        height={72} 
        style={{ 
          opacity: 0.8,
          objectFit: 'contain'
        }} 
      />
    </Box>
  </>
);
