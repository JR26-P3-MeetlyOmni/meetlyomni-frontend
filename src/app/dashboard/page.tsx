'use client';

import { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AuthGuard, useAuth, useLogout, useUserRole } from '@/features/auth';

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '800px',
  margin: '0 auto',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
}));

const SignOutContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export default function DashboardPage() {
  const { user } = useAuth();
  const { userInfo } = useUserRole();
  const { logout } = useLogout();

  const handleSignOut = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <AuthGuard requireAuth={true}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Page
        </Typography>

        <InfoSection>
          <InfoLabel>User:</InfoLabel>
          <InfoValue>
            {String(user?.fullName || userInfo?.name || 'Loading...')}
          </InfoValue>
        </InfoSection>

        <InfoSection>
          <InfoLabel>Role:</InfoLabel>
          <InfoValue>
            {String(user?.role || userInfo?.role || 'Loading...')}
          </InfoValue>
        </InfoSection>

        <SignOutContainer>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleSignOut}
            size="medium"
          >
            Sign Out
          </Button>
        </SignOutContainer>

      </Container>
    </AuthGuard>
  );
}
