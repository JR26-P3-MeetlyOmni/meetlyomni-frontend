'use client';

import NextLink from 'next/link';
import React from 'react';

import { FPButton, Row } from './ForgotPasswordButton.style';

export default function ForgotPasswordButton() {
  return (
    <Row>
      <FPButton
        component={NextLink}
        href="/forgot-password"
        variant="text"
        aria-label="Forgot password"
      >
        Forgot password?
      </FPButton>
    </Row>
  );
}
