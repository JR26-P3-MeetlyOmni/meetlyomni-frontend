import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SuccessContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: theme.zIndex.appBar - 1,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: theme.breakpoints.values.sm,
  textAlign: 'center',
  gap: theme.spacing(2.5),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  zIndex: theme.zIndex.appBar,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: theme.typography.h4.lineHeight,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: theme.breakpoints.values.sm,
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.body2.lineHeight,
  fontFamily: theme.typography.fontFamily,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const EmailRequestSuccess: React.FC = () => {
  return (
    <SuccessContainer>
      <ContentContainer>
        <IconContainer>
          <Image
            src="/assets/images/WelcomeToSignin/pwreset-icon.png"
            alt="Success Checkmark"
            width={44}
            height={44}
          />
        </IconContainer>

        <TitleText>Password reset link has been sent</TitleText>

        <DescriptionText>
          An email with password reset link has been sent to your email address. If you do not see
          it in the inbox, check your spam folder
        </DescriptionText>

        <ButtonContainer>
          <Link href="/login" passHref>
            <BackButton>Back to Sign in</BackButton>
          </Link>
        </ButtonContainer>
      </ContentContainer>
    </SuccessContainer>
  );
};

export default EmailRequestSuccess;
