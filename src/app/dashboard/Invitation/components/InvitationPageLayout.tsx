'use client';

import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px)',
  padding: theme.spacing(2),
}));

const StyledModalContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(4),
}));

interface InvitationPageLayoutProps {
  children: React.ReactNode;
}

export default function InvitationPageLayout({ children }: InvitationPageLayoutProps) {
  return (
    <StyledPageContainer>
      <Container maxWidth="sm">
        <StyledModalContainer>{children}</StyledModalContainer>
      </Container>
    </StyledPageContainer>
  );
}
