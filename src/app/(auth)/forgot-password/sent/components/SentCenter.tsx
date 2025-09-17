// src/app/(auth)/forgot-password/sent/components/SentCenter.tsx
'use client';

import React from 'react';
import { Center, Root } from './SentCenter.style';

export default function SentCenter({ children }: { children: React.ReactNode }) {
  return (
    <Root>
      <Center>{children}</Center>
    </Root>
  );
}
