'use client';

import AuthLayout from '@/app/[locale]/(auth)/components/AuthLayout/AuthLayout';

import React from 'react';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <h1>Login Page</h1>
        <p>This is a placeholder for your login form.</p>
      </div>
    </AuthLayout>
  );
}
