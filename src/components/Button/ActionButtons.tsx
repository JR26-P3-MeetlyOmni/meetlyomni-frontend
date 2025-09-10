import React from 'react';

import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CTAButtonStyleProps, getCTAButtonStyles } from './ButtonStyles';

export interface CTAButtonProps extends ButtonProps, CTAButtonStyleProps {}

const StyledButton = styled(Button, {
  shouldForwardProp: prop => !['width', 'height', 'fontSize'].includes(prop as string),
})<CTAButtonStyleProps>(({ theme, width, height, fontSize }) => ({
  ...getCTAButtonStyles(theme, { width, height, fontSize }),
  textTransform: 'none',
}));

export const CTAButton: React.FC<CTAButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default CTAButton;
