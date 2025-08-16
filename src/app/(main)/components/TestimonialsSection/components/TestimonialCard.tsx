import { motion } from 'framer-motion';

import React from 'react';

import { Avatar, Box, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import type { TestimonialCardProps } from '../types';

const getGradientOverlay = (position: string, theme: Theme) => {
  if (position === 'center') return {};
  return {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 20,
    zIndex: 2,
    background:
      position === 'left'
        ? `linear-gradient(to left, transparent 10%, ${theme.palette.common.white} 100%)`
        : `linear-gradient(to right, transparent 10%, ${theme.palette.common.white} 100%)`,
    transition: 'background 0.7s cubic-bezier(.77,0,.18,1)',
  };
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ data, ...props }) => {
  const { name, role, content, avatarUrl, position } = data;
  const theme = useTheme();
  return (
    <motion.div
      style={{
        width: 420,
        minHeight: 220,
        borderRadius: 20,
        boxShadow: position === 'center' ? '0 8px 32px #2563eb33' : '0 2px 8px #0001',
        background:
          position === 'center' ? theme.palette.primary.main : theme.palette.background.paper,
        color:
          position === 'center'
            ? theme.palette.getContrastText(theme.palette.primary.main)
            : theme.palette.text.primary,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        margin: '0 8px',
      }}
      animate={{
        scale: position === 'center' ? 1.08 : 0.95,
      }}
      transition={{ duration: 0.7, type: 'spring' }}
      {...props}
    >
      <Box sx={getGradientOverlay(position, theme)} />
      <motion.div transition={{ duration: 0.7 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
          {content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar src={avatarUrl} alt={name} sx={{ width: 40, height: 40, mr: 2 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{name}</Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.7 }}>{role}</Typography>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
