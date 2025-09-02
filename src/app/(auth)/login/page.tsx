
import React from 'react';

//This LoginForm is used for testing login workflow. should be replace by ticket #36
import { LoginForm } from './components/LoginForm';
import Link from 'next/link';


import { ClientSignInForm } from './components/ClientSignInForm';
import { DecorativeElements } from './components/DecorativeElements';
import { StyledLoginPage } from './components/StyledLoginPage';

export default function SigninPage() {
  return (

    <StyledLoginPage
      decorativeElements={<DecorativeElements />}
      signInForm={<ClientSignInForm />}
    />

    // <div>
    //   <LoginForm />
    //   <Link href="/forgetpassword">Forget Password</Link>
    // </div>

  );
}
