'use client';

import { useSignInForm } from '@/features/auth/hooks';

import React from 'react';

import { SignInForm } from './SignInForm';

export const ClientSignInForm = () => {
  const { formData, errors, handleInputChange, handleInputBlur } = useSignInForm();

  return (
    <SignInForm
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
    />
  );
};
