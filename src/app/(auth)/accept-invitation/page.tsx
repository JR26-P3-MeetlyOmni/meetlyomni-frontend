import React from 'react';

import { DecorativeElements } from '../login/components/DecorativeElements';
import { StyledLoginPage } from '../login/components/StyledLoginPage';
import { ClientAcceptInvitationForm } from './components/ClientAcceptInvitationForm';

export default function AcceptInvitationPage() {
  return (
    <StyledLoginPage
      decorativeElements={<DecorativeElements />}
      signInForm={<ClientAcceptInvitationForm />}
    />
  );
}
