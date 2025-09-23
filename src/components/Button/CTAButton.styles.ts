import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import CTAButtonStyleProps from './CTAButton.types';

export const StyledCTAButton = styled(Button, {
  shouldForwardProp: prop => !['width', 'height', 'fontSize'].includes(prop as string),
})<CTAButtonStyleProps>(({ theme, width, height, fontSize }) => ({
  fontSize: fontSize ?? theme.typography.subtitle2.fontSize,
  fontFamily: 'var(--font-roboto)',
  fontWeight: theme.typography.fontWeightRegular,
  width: width ?? theme.spacing(13),
  height: height ?? theme.spacing(4.75),
  padding: theme.spacing(1.25),
  marginTop: theme.spacing(-3),
  borderRadius: theme.spacing(1),
  letterSpacing: 0.5,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
  // contained variant
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.8),
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    },
  },
  // outlined variant
  '&.MuiButton-outlined': {
    borderWidth: 2,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.disabled,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.08),
      transform: 'translateY(-2px)',
      borderWidth: 1,
    },
  },
}));
