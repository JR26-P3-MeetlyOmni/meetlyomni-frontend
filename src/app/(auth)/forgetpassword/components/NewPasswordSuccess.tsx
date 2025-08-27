import { FormContainer } from '@/components/Auth/AuthFormComponents';

import { Alert } from '@mui/material';

const NewPasswordSuccess: React.FC = () => {
  return (
    <FormContainer>
      <Alert severity="success">
        Password has been reset successfully! Redirecting to login...
      </Alert>
    </FormContainer>
  );
};

export default NewPasswordSuccess;
