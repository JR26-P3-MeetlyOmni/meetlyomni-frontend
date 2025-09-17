'use client';

import React from 'react';

import { ClientSignInForm } from './components/ClientSignInForm';
import { DecorativeElements } from './components/DecorativeElements';
import { StyledLoginPage } from './components/StyledLoginPage';
import ForgotPasswordButton from './components/ForgotPasswordButton';

export default function Page() {
  return (
    <StyledLoginPage
      decorativeElements={<DecorativeElements />}
      signInForm={
        <>
          <ClientSignInForm />
          <ForgotPasswordButton />
        </>
      }
    />
  );
}
