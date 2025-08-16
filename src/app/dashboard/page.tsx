'use client';

import { AuthGuard, useAuth } from '@/features/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard requireAuth={true}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          
          {user && (
            <Box sx={{ mt: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Welcome, {user.fullName}!
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Role: {user.role}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Organization: {user.organizationCode}
              </Typography>
            </Box>
          )}
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </AuthGuard>
  );
}
  