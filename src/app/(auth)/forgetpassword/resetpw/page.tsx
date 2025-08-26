'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, styled, Alert, CircularProgress, Button } from '@mui/material';
import Link from 'next/link';
import { DecorativeElements } from '../components/DecorativeElements';
import NewPasswordForm from '../components/NewPasswordForm';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.grey[50],
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const FormContainer = styled(Box)(() => ({
  position: 'relative',
  zIndex: 10,
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  justifyContent: 'center',
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'relative',
  zIndex: 10,
  margin: '0 auto',
}));

const LoadingContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
}));

const BackLinkContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
}));

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    
    if (!tokenParam) {
      setError('Invalid reset link. Please request a new password reset.');
      setIsLoading(false);
      return;
    }

    // Here you could validate the token with the server if needed
    setToken(tokenParam);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error || !token) {
    return (
      <ErrorContainer>
        <Alert severity="error">
          {error || 'Invalid reset link'}
        </Alert>
        <BackLinkContainer>
          <Button component={Link} href="/login" variant="outlined">
            Back to login
          </Button>
        </BackLinkContainer>
      </ErrorContainer>
    );
  }

  return <NewPasswordForm token={token} />;
}

export default function VerifyPage() {
  return (
    <PageContainer>
      <DecorativeElements />
      <FormContainer>
        <Suspense 
          fallback={
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          }
        >
          <VerifyPageContent />
        </Suspense>
      </FormContainer>
    </PageContainer>
  );
}