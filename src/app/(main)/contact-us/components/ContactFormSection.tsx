'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, styled } from '@mui/material';

import { FormData } from '../type';
import { useAnalytics } from '../useAnalytics';
import FormInput from './FormInput';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: theme.spacing(83.75),
  margin: '0 auto',
}));

const NameRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3.75),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 0,
  },
}));

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

const ContactFormSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const { trackContactForm } = useAnalytics();

  const onSubmit = React.useCallback(
    async (_data: FormData) => {
      try {
        // Use dedicated form tracking function - now directly accepts FormData
        await trackContactForm(_data);

        reset();
        alert('Message sent successfully! We will get back to you soon.');
      } catch (error) {
        // Log error for debugging purposes
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
        alert('Failed to send message. Please try again.');
      }
    },
    [reset, trackContactForm],
  );

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
        label="Email Address"
        name="email"
        register={register}
        error={errors.email?.message}
        placeholder="Email Address"
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

export default ContactFormSection;
