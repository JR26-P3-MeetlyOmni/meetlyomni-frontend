import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { Alert, Box, Button, CircularProgress, styled } from '@mui/material';

import { DecorativeElements } from '../components/DecorativeElements';
import NewPasswordForm from '../components/NewPasswordForm';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
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

const ErrorContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'relative',
  zIndex: 15,
  margin: '0 auto',
  transform: 'translateY(15vh)',
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
        <Alert severity="error">{error || 'Invalid reset link'}</Alert>
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
      <Suspense
        fallback={
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        }
      >
        <VerifyPageContent />
      </Suspense>
    </PageContainer>
  );
}
