import type { AuthResultPageProps } from '@/components/ConfirmationForm/types';
import { getAssetUrl } from '@/utils/cdn';

import type { VerificationStatus } from '../types';

export const getVerificationStatusConfig = (
  email?: string,
): Record<VerificationStatus, AuthResultPageProps> => ({
  success: {
    iconSrc: getAssetUrl('StaticFiles/assets/images/confirmationForm/green-success-check.png'),
    iconAlt: 'Email verification successful',
    title: 'Email Verification Successful!',
    description: email
      ? `Your email ${email} has been successfully verified. You can now use all features.`
      : 'Your email has been successfully verified. You can now use all features.',
    buttonText: 'Go to Login',
    buttonHref: '/login',
  },
  failed: {
    iconSrc: getAssetUrl('StaticFiles/assets/images/confirmationForm/green-success-check.png'),
    iconAlt: 'Email verification failed',
    title: 'Email Verification Failed',
    description: email
      ? `The verification link is invalid or expired. Please request a new verification email for ${email}.`
      : 'The verification link is invalid or expired. Please request a new verification email.',
    buttonText: 'Request New Verification',
    buttonHref: '/signup',
  },
  already_confirmed: {
    iconSrc: getAssetUrl('StaticFiles/assets/images/confirmationForm/green-success-check.png'),
    iconAlt: 'Email already confirmed',
    title: 'Email Already Confirmed',
    description: email
      ? `Your email ${email} has already been verified. No need to verify again.`
      : 'Your email has already been verified. No need to verify again.',
    buttonText: 'Go to Login',
    buttonHref: '/login',
  },
  not_found: {
    iconSrc: getAssetUrl('StaticFiles/assets/images/confirmationForm/green-success-check.png'),
    iconAlt: 'User not found',
    title: 'User Not Found',
    description: 'User account not found. Please check if the link is correct, or register again.',
    buttonText: 'Register Again',
    buttonHref: '/signup',
  },
  verifying: {
    iconSrc: getAssetUrl('StaticFiles/assets/images/confirmationForm/green-success-check.png'),
    iconAlt: 'Email verification in progress',
    title: 'Verifying Email...',
    description: email
      ? `We are verifying your email ${email}, please wait.`
      : 'We are verifying your email, please wait.',
    buttonText: 'Back to Home',
    buttonHref: '/',
  },
});
