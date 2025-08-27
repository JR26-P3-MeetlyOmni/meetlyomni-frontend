import React from 'react';
import type { PasswordValidationRulesProps } from '../../types';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ValidationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

const ValidationText = styled(Typography)<{ isValid: boolean }>(({ theme, isValid }) => ({
  fontSize: '14px',
  color: isValid ? theme.palette.success.main : theme.palette.text.secondary,
  lineHeight: 1.4,
}));

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
