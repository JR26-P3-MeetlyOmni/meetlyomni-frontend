import React from 'react';

import { AuthResultPageComponent } from '../components/passwordReset/ResultPage';
import { RESET_PASSWORD_SUCCESS } from '@/constants/AuthResultData';

const NewPasswordSuccess: React.FC = () => {
  return (
    <AuthResultPageComponent
      iconSrc={RESET_PASSWORD_SUCCESS.iconSrc}
      iconAlt={RESET_PASSWORD_SUCCESS.iconAlt}
      title={RESET_PASSWORD_SUCCESS.title}
      description={RESET_PASSWORD_SUCCESS.description}
    />
  );
};

export default NewPasswordSuccess;
