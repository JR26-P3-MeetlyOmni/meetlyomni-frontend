'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Container, styled, Typography } from '@mui/material';

import { ContactFormSectionProps, FormData } from '.';
import BackgroundDecoration from './components/BackgroundDecoration';
import FormInput from './components/FormInput';

// Main container
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  minHeight: '100vh',
}));

// Page title styling
const StyledTitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(70),
  width: 'auto',
  height: 'auto',
  margin: '0 auto 0',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(56),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    fontSize: theme.typography.pxToRem(48),
    whiteSpace: 'normal',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(36),
    whiteSpace: 'normal',
  },
}));

// Page subtitle styling
const StyledSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(80),
  width: 'auto',
  height: 'auto',
  margin: `${theme.spacing(2)} auto ${theme.spacing(10)}`, // 16px from title, 80px to form
  padding: `0 ${theme.spacing(2)}`,
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.5,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    padding: `0 ${theme.spacing(1)}`,
  },
}));

// Form container
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: theme.spacing(83.75),
  margin: '0 auto',
}));

// Row for first name and last name inputs
const NameRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3.75),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 0,
  },
}));

// Send button
const StyledSendButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(40),
  height: theme.spacing(4.75),
  margin: `${theme.spacing(6)} 0 0 0`,
  padding: `${theme.spacing(1.5)} ${theme.spacing(18)}`,
  borderRadius: theme.spacing(0.75),
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
  backgroundColor: '#14183b',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1,
  color: theme.palette.common.white,
  textTransform: 'none',
  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: '#14183b',
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:disabled': {
    backgroundColor: '#d0d0d0',
    color: '#888888',
    cursor: 'not-allowed',
  },
  [theme.breakpoints.down('md')]: {
    margin: `${theme.spacing(6)} 0 0 0`,
    width: '100%',
    alignSelf: 'flex-start',
  },
}));

// Form section component
const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  register,
  errors,
  handleSubmit,
  isSubmitting,
  isValid,
  onSubmit,
}) => {
  return (
    <FormContainer>
      <NameRow>
        <FormInput
          label="First name"
          name="firstName"
          register={register}
          error={errors.firstName?.message}
          placeholder="First name"
          width="40"
        />
        <FormInput
          label="Last name"
          name="lastName"
          register={register}
          error={errors.lastName?.message}
          placeholder="Last name"
          width="40"
        />
      </NameRow>

      <FormInput
        label="Email"
        name="email"
        register={register}
        error={errors.email?.message}
        placeholder="Email"
        type="email"
        width="83.75"
      />

      <FormInput
        label="Your Question"
        name="question"
        register={register}
        error={errors.question?.message}
        placeholder="Enter your text here"
        multiline
        rows={6}
        width="83.75"
      />

      <StyledSendButton onClick={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </StyledSendButton>
    </FormContainer>
  );
};

// Main contact page component
export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // Handle form submission
  const onSubmit = React.useCallback(
    async (_data: FormData) => {
      setIsSubmitting(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        reset();
        alert('Message sent successfully!');
      } catch {
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset],
  );

  return (
    <StyledContainer maxWidth={false}>
      <BackgroundDecoration />
      <StyledTitle>Contact our team</StyledTitle>
      <StyledSubtitle>
        Contact us now to find out how you can make your event more lively and engaging with
        interactive Q&A and live sweepstakes!
      </StyledSubtitle>
      <ContactFormSection
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        isValid={isValid}
      />
    </StyledContainer>
  );
}
