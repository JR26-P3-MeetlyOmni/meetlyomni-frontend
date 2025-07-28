// src/app/components/AuthLayout/Branding/Branding.style.ts
'use client';

import styled from '@emotion/styled';

// src/app/components/AuthLayout/Branding/Branding.style.ts

export const Wrapper = styled.div`
  text-align: center;
  max-width: 480px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const Illustration = styled.img`
  width: 100%;
  max-width: 320px;
  margin-bottom: 2rem;
`;

export const Heading = styled.h2`
  font-size: 1.875rem; // 30px
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1f2937;

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

export const Highlight = styled.span`
  color: #6366f1; // Tailwind Indigo-500
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.75rem;

  @media (max-width: 767px) {
    font-size: 0.95rem;
  }
`;
