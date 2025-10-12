import { selectIsLoading } from '@/features/auth/authSelectors';
import { useAcceptInvitationHandlers } from '@/features/invitation/hooks';
import { useAppSelector } from '@/store/hooks';

import React from 'react';

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ErrorText } from '../../login/components/FormElements';
import { EmailInput, PasswordInput } from '../../login/components/FormInputs';
import { BackToHomeLink } from '../../login/components/FormLinks';

const StyledFormBox = styled('form')({
  maxWidth: 412,
  margin: '0 auto',
});

// Accept Invitation Button Component
const StyledAcceptInvitationButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 38,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.grey[900],
  textTransform: 'none',
  fontFamily: theme.typography.button.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  fontSize: theme.typography.button.fontSize,
  lineHeight: theme.typography.button.lineHeight,
  letterSpacing: theme.typography.button.letterSpacing,
  color: theme.palette.primary.contrastText,
  '&:hover': { backgroundColor: theme.palette.grey[900] },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
  },
}));

interface AcceptInvitationButtonProps {
  isLoading: boolean;
}

const AcceptInvitationButton: React.FC<AcceptInvitationButtonProps> = ({ isLoading }) => (
  <StyledAcceptInvitationButton type="submit" variant="contained" disabled={isLoading}>
    {isLoading ? 'Accepting invitation...' : 'Accept Invitation'}
  </StyledAcceptInvitationButton>
);

interface AcceptInvitationFormProps {
  formData: { email: string; password: string; token: string };
  errors: { email: string; password: string };
  handleInputChange: (field: string, value: string) => void;
  handleInputBlur: (field: string, value: string) => void;
}

export const AcceptInvitationForm: React.FC<AcceptInvitationFormProps> = ({
  formData,
  errors,
  handleInputChange,
  handleInputBlur,
}) => {
  const isLoading = useAppSelector(selectIsLoading);

  const {
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleSubmit,
    isSubmitting,
  } = useAcceptInvitationHandlers(formData, handleInputChange, handleInputBlur);

  const emailError = typeof errors.email === 'string' ? errors.email : '';
  const passwordError = typeof errors.password === 'string' ? errors.password : '';

  return (
    <StyledFormBox onSubmit={handleSubmit}>
      <EmailInput
        value={formData.email}
        hasError={!!emailError}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
      />
      <ErrorText error={emailError} />

      <PasswordInput
        value={formData.password}
        hasError={!!passwordError}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
      />
      <ErrorText error={passwordError} />

      <AcceptInvitationButton isLoading={isLoading || isSubmitting} />
      <BackToHomeLink />
    </StyledFormBox>
  );
};
