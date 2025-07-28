// src/app/components/AuthLayout/AuthLayout.tsx
import React, { ReactNode } from 'react';

import { BrandingWrapper, Container, FormWrapper } from './AuthLayout.style';
import Branding from './Branding/Branding';

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
