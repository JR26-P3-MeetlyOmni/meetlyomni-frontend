'use client';

import React, { useState } from 'react';

import { Box, Button, Container, styled, Typography } from '@mui/material';

import FormInput from './components/FormInput';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
}));

// Hero Section
const StyledTitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(54.5), // 436px / 8 ≈ 54.5
  height: theme.spacing(8.25), // 66px / 8 ≈ 8.25
  margin: `0 ${theme.spacing(14.625)} 0`, // 117px / 8 ≈ 14.625
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(56),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 'normal',
  textAlign: 'center',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: '0 0 0',
    fontSize: theme.typography.pxToRem(48),
    height: 'auto',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  width: theme.spacing(64.5), // 516px / 8 ≈ 64.5
  height: theme.spacing(4), // 32px / 8 = 4
  margin: `${theme.spacing(2)} ${theme.spacing(9.625)} ${theme.spacing(10)}`, // 16px, 77px, 80px
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 'normal',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: `${theme.spacing(2)} 0 ${theme.spacing(10)}`,
    height: 'auto',
  },
}));

// Form Container
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: theme.spacing(83.75), // 670px / 8 ≈ 83.75
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[1],
}));

// First Name and Last Name Row
const NameRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3.75), // 30px / 8 ≈ 3.75
  width: '100%',
  marginBottom: theme.spacing(3), // 24px / 8 = 3
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 0,
  },
}));

// Send Button
const StyledSendButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(40), // 320px / 8 = 40
  height: theme.spacing(4.75), // 38px / 8 ≈ 4.75
  margin: `${theme.spacing(6)} ${theme.spacing(3.75)} 0 0`, // 48px, 30px
  padding: `${theme.spacing(1.5)} ${theme.spacing(18)}`, // 12px, 144px
  borderRadius: theme.spacing(0.75), // 6px / 8 = 0.75
  boxShadow: theme.shadows[1],
  backgroundImage: 'linear-gradient(to bottom, #f0f0f1, rgba(220, 221, 223, 0.3))',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1,
  color: theme.palette.text.primary,
  textTransform: 'none',
  transition: theme.transitions.create(['background-image', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundImage: 'linear-gradient(to bottom, #e8e8e9, rgba(200, 201, 203, 0.4))',
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:disabled': {
    backgroundImage: 'linear-gradient(to bottom, #f5f5f5, rgba(240, 240, 241, 0.2))',
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
  },
  [theme.breakpoints.down('md')]: {
    margin: `${theme.spacing(6)} 0 0 0`,
    width: '100%',
  },
}));

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

interface ContactFormSectionProps {
  formData: FormData;
  isSubmitting: boolean;
  isFormValid: boolean;
  onInputChange: (field: keyof FormData) => (value: string) => void;
  onSubmit: () => Promise<void>;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  isSubmitting,
  isFormValid,
  onInputChange,
  onSubmit,
}) => {
  const handleSubmit = React.useCallback(() => {
    void onSubmit();
  }, [onSubmit]);

  return (
    <FormContainer>
      <NameRow>
        <FormInput
          label="First name"
          value={formData.firstName}
          onChange={onInputChange('firstName')}
          placeholder="First name"
          width="40"
          required={true}
        />
        <FormInput
          label="Last name"
          value={formData.lastName}
          onChange={onInputChange('lastName')}
          placeholder="Last name"
          width="40"
          required={true}
        />
      </NameRow>

      <FormInput
        label="Email Address"
        value={formData.email}
        onChange={onInputChange('email')}
        placeholder="Email Address"
        type="email"
        width="83.75"
        required={true}
      />

      <FormInput
        label="Your Question"
        value={formData.question}
        onChange={onInputChange('question')}
        placeholder="Your Question"
        multiline
        rows={6}
        width="83.75"
        required={true}
      />

      <StyledSendButton onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </StyledSendButton>
    </FormContainer>
  );
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    question: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = React.useCallback(
    (field: keyof FormData) => (value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 重置表单
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        question: '',
      });

      alert('Message sent successfully!');
    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const isFormValid = !!(
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.question
  );

  return (
    <StyledContainer maxWidth={false}>
      {/* Hero Section */}
      <StyledTitle>Contact our team</StyledTitle>

      <StyledSubtitle>
        Contact us now to find out how you can make your event more lively and engaging with
        interactive Q&A and live sweepstakes!
      </StyledSubtitle>

      {/* Contact Form */}
      <ContactFormSection
        formData={formData}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </StyledContainer>
  );
}
