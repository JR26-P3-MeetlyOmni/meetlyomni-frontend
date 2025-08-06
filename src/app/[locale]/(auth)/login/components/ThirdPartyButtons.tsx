import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ThirdPartyButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  fontFamily: 'Roboto, sans-serif',
  fontSize: 14,
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: theme.spacing(0.75),
  height: 40,
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
}));

const ThirdPartyIcon = styled(Box)(() => ({
  marginRight: 8,
  display: 'flex',
  alignItems: 'center',
}));

export const ThirdPartyButtons: React.FC = () => {
  const handleGoogleLogin = useCallback(() => {
    // TODO: Implement Google OAuth
    // console.log('Google login clicked');
  }, []);

  const handleMicrosoftLogin = useCallback(() => {
    // TODO: Implement Microsoft OAuth
    // console.log('Microsoft login clicked');
  }, []);

  return (
    <>
      <ThirdPartyButton onClick={handleGoogleLogin}>
        <ThirdPartyIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </ThirdPartyIcon>
        Sign in with Google
      </ThirdPartyButton>

      <ThirdPartyButton onClick={handleMicrosoftLogin}>
        <ThirdPartyIcon>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
            <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
            <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
            <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
          </svg>
        </ThirdPartyIcon>
        Sign in with Microsoft
      </ThirdPartyButton>
    </>
  );
};
