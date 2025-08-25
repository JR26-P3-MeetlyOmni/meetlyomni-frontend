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
  maxWidth: theme.spacing(70), // 增加最大宽度，确保文字能在一行显示
  width: 'auto', // 自动宽度
  height: 'auto', // 自动高度
  margin: `0 auto 0`, // 居中显示
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 明确使用Roboto字体
  fontSize: theme.typography.pxToRem(56),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.2, // 设置合适的行高
  textAlign: 'center',
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap', // 防止换行
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    fontSize: theme.typography.pxToRem(48),
    whiteSpace: 'normal', // 小屏幕允许换行
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(36),
    whiteSpace: 'normal',
  },
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.spacing(80), // 增加最大宽度
  width: 'auto',
  height: 'auto',
  margin: `${theme.spacing(2)} auto ${theme.spacing(10)}`, // 居中显示
  padding: `0 ${theme.spacing(2)}`, // 添加左右内边距
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 明确使用Roboto字体
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.5, // 更好的行高
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%',
    padding: `0 ${theme.spacing(1)}`,
  },
}));

// Form Container
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // 左对齐，让按钮在左下角
  width: '100%',
  maxWidth: theme.spacing(83.75), // 670px / 8 ≈ 83.75
  margin: '0 auto', // 整个容器居中
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
  margin: `${theme.spacing(6)} 0 0 0`, // 顶部48px间距，左对齐
  padding: `${theme.spacing(1.5)} ${theme.spacing(18)}`, // 12px, 144px
  borderRadius: theme.spacing(0.75), // 6px / 8 = 0.75
  boxShadow: theme.shadows[1],
  backgroundImage: 'linear-gradient(to bottom, #f0f0f1, rgba(220, 221, 223, 0.3))',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // 明确使用Roboto字体
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
    alignSelf: 'flex-start', // 确保移动端也左对齐
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
        placeholder="Enter your text here"
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
      <StyledTitle>Contact our team</StyledTitle>
      <StyledSubtitle>
        Contact us now to find out how you can make your event more lively and engaging with
        interactive Q&A and live sweepstakes!
      </StyledSubtitle>
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
