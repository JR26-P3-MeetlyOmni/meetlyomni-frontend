// src/features/auth/components/ContactInfoStep/ContactInfoStep.tsx
'use client';

import React from 'react';

import { Typography } from '@mui/material';

import * as S from './ContactInfoStep.style';
import {
  NAME_PLACEHOLDER,
  type NextPayload,
  PHONE_PLACEHOLDER,
  useContactInfoForm,
} from './ContactInfoStep.hook';

// src/features/auth/components/ContactInfoStep/ContactInfoStep.tsx

// src/features/auth/components/ContactInfoStep/ContactInfoStep.tsx

type Props = { onNext: (p: NextPayload) => void; onBack: () => void };

const TitleBlock = () => (
  <S.TitleBlock>
    <S.Title>Please Provide Your Contact Information</S.Title>
    <S.SubTitle>Your contact will be used for account related notifications only.</S.SubTitle>
  </S.TitleBlock>
);

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: boolean;
  errId: string;
  autoFocus?: boolean;
  type?: string;
  inputProps?: Record<string, unknown>;
};

const Field = React.memo(function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  errId,
  autoFocus,
  type,
  inputProps,
}: FieldProps) {
  return (
    <S.FieldWrap>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.BigInput
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        required
        error={error}
        autoFocus={autoFocus}
        type={type}
        inputProps={error ? { 'aria-describedby': errId, ...inputProps } : inputProps}
      />
      {error ? (
        <S.ErrorText id={errId} role="alert">
          {label === 'phone:'
            ? 'Enter 0XXXXXXXXX or XXXXXXXXX (+61 applied automatically)'
            : 'Contact name is required'}
        </S.ErrorText>
      ) : null}
    </S.FieldWrap>
  );
});

export default function ContactInfoStep({ onNext, onBack }: Props) {
  const f = useContactInfoForm(onNext, onBack);
  const nameErrId = 'contact-name-error';
  const phoneErrId = 'contact-phone-error';

  return (
    <S.Wrapper>
      <TitleBlock />
      <S.FormWrap onSubmit={f.handleSubmit} noValidate>
        <Field
          id="contactName"
          label="contact name:"
          placeholder={NAME_PLACEHOLDER}
          value={f.name}
          onChange={f.handleNameChange}
          onBlur={f.handleNameBlur}
          error={f.showNameError}
          errId={nameErrId}
          autoFocus
        />
        <Field
          id="contactPhone"
          label="phone:"
          placeholder={PHONE_PLACEHOLDER}
          value={f.phone}
          onChange={f.handlePhoneChange}
          onBlur={f.handlePhoneBlur}
          error={f.showPhoneError}
          errId={phoneErrId}
          type="tel"
          inputProps={{ inputMode: 'numeric' }}
        />
        <S.Actions>
          <S.BackButton variant="outlined" onClick={f.handleBack}>
            Back
          </S.BackButton>
          <S.NextButton type="submit" variant="contained" color="primary" disabled={!f.isFormValid}>
            <Typography component="span" variant="h6">
              Next
            </Typography>
          </S.NextButton>
        </S.Actions>
      </S.FormWrap>
    </S.Wrapper>
  );
}
