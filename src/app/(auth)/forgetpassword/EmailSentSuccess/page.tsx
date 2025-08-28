import React from 'react';

import { AuthResultPageComponent } from '../components/passwordReset/ResultPage';
import { PASSWORD_RESET_SENT } from '@/constants/AuthResultData';

const EmailRequestSuccess: React.FC = () => {
  return (
    <AuthResultPageComponent
      iconSrc={PASSWORD_RESET_SENT.iconSrc}
      iconAlt={PASSWORD_RESET_SENT.iconAlt}
      title={PASSWORD_RESET_SENT.title}
      description={PASSWORD_RESET_SENT.description}
    />
  );
};

export default EmailRequestSuccess;
