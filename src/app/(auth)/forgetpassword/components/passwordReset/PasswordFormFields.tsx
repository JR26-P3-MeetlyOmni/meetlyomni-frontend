import { Box, styled } from '@mui/material';
import type { PasswordValidation } from '../../types';
import ConfirmPasswordField from './ConfirmPasswordField';
import PasswordField from './NewPasswordField';
import PasswordValidationRules from './PasswordValidationRules';

interface PasswordFormFieldsProps {
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  validation: PasswordValidation;
  showValidation: boolean;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}

const SpacingBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3), 
}));

const PasswordFormFields: React.FC<PasswordFormFieldsProps> = ({
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  isSubmitting,
  validation,
  showValidation,
  setPassword,
  setConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
}) => {
  return (
    <>
      <PasswordField
        password={password}
        showPassword={showPassword}
        isSubmitting={isSubmitting}
        onPasswordChange={setPassword}
        onToggleVisibility={toggleShowPassword}
      />
      <SpacingBox />

      {showValidation === true && (
        <PasswordValidationRules
          isLengthOk={validation.minLength === true}
          isCaseOk={validation.hasUpper === true && validation.hasLower === true}
          isNumSpecialOk={validation.hasNumber === true && validation.hasSpecial === true}
          hasInput={password.length > 0}
          isStrong={
            validation.minLength === true &&
            validation.hasUpper === true &&
            validation.hasLower === true &&
            validation.hasNumber === true &&
            validation.hasSpecial === true
          }
        />
      )}

      <ConfirmPasswordField
        confirmPassword={confirmPassword}
        showConfirmPassword={showConfirmPassword}
        isSubmitting={isSubmitting}
        hasError={confirmPassword.length > 0 && !validation.match}
        errorMessage="Passwords do not match"
        onConfirmPasswordChange={setConfirmPassword}
        onToggleVisibility={toggleShowConfirmPassword}
      />
    </>
  );
};

export default PasswordFormFields;
