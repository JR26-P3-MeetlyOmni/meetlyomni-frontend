import React from 'react';

import { ClientSignInForm } from './components/ClientSignInForm';
import { DecorativeElements } from './components/DecorativeElements';
import { StyledLoginPage } from './components/StyledLoginPage';

export default function SigninPage() {
  return (
    <StyledLoginPage
      decorativeElements={<DecorativeElements />}
      signInForm={<ClientSignInForm />}
    />
  );
}
