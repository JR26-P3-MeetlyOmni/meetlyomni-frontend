import { ValidationContainer, ValidationText } from '@/components/Auth/AuthFormComponents';

import React from 'react';

import type { PasswordValidationRulesProps } from '../../types';

const PasswordValidationRules: React.FC<PasswordValidationRulesProps> = ({
  isLengthOk,
  isCaseOk,
  isNumSpecialOk,
  hasInput,
  isStrong,
}) => {
  if (!hasInput || isStrong) {
    return null;
  }

  return (
    <ValidationContainer>
      <ValidationText isValid={isLengthOk}>✓ At least 12 characters</ValidationText>
      <ValidationText isValid={isCaseOk}>
        ✓ At least 1 uppercase letter & 1 lowercase letter
      </ValidationText>
      <ValidationText isValid={isNumSpecialOk}>
        ✓ At least 1 number & 1 special character
      </ValidationText>
    </ValidationContainer>
  );
};

export default PasswordValidationRules;
