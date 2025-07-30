// src/app/components/AuthLayout/AuthLayout.tsx
import React, { ReactNode } from 'react';

import Branding from '../Branding/Branding';
import { BrandingWrapper, Container, FormWrapper } from './AuthLayout.style';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container>
      <FormWrapper>{children}</FormWrapper>
      <BrandingWrapper>
        <Branding />
      </BrandingWrapper>
    </Container>
  );
};

export default AuthLayout;
