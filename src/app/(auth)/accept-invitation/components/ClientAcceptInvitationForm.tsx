'use client';

import { clearError } from '@/features/invitation';
import { useAcceptInvitationForm } from '@/features/invitation/hooks';

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AcceptInvitationForm } from './AcceptInvitationForm';

export const ClientAcceptInvitationForm = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Extract token and email from URL parameters
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const { formData, errors, handleInputChange, handleInputBlur } = useAcceptInvitationForm(
    email,
    token,
  );

  // Clear any previous errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <AcceptInvitationForm
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
    />
  );
};
