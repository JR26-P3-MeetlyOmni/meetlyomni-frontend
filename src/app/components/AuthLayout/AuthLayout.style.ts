// src/app/components/AuthLayout/AuthLayout.style.ts
'use client';

import styled from '@emotion/styled';

// src/app/components/AuthLayout/AuthLayout.style.ts

export const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1023px) {
    padding: 3rem 1.5rem;
  }

  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;

export const BrandingWrapper = styled.div`
  flex: 1;
  background-color: #f5f7fb;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    padding: 2rem 1rem;
  }
`;
