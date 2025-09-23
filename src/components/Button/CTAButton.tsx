import React from 'react';

import { StyledCTAButton } from './CTAButton.styles';
import CTAButtonStyleProps from './CTAButton.types';

export const CTAButton: React.FC<CTAButtonStyleProps> = props => {
  return <StyledCTAButton {...props} />;
};

export default CTAButton;
