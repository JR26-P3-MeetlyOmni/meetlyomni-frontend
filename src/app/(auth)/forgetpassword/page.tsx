'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DecorativeElements } from './components/DecorativeElements';
import EmailRequestForm from './components/EmailRequestForm';

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const ResetPasswordPage: React.FC = () => {
  return (
    <PageContainer>
      <DecorativeElements />
      <EmailRequestForm />
    </PageContainer>
  );
};

export default ResetPasswordPage;
