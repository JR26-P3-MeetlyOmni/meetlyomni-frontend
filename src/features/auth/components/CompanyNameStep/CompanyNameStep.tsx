// src/features/auth/components/CompanyNameStep/CompanyNameStep.tsx
'use client';

import React from 'react';
import { useCallback, useState } from 'react';

import { Typography } from '@mui/material';

import * as S from './CompanyNameStep.style';

// src/features/auth/components/CompanyNameStep/CompanyNameStep.tsx

type Props = { onNext: (companyName: string) => void };

export default function CompanyNameStep({ onNext }: Props) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = value.trim().length > 0;
  const showError = touched && !isValid;
  const errorId = showError ? 'companyName-error' : undefined;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);
      const next = value.trim();
      if (!next) return;
      onNext(next);
    },
    [onNext, value],
  );

  return (
    <S.Wrapper>
      <S.TitleRow>
        <S.TitleHighlight>Welcome to Omni !</S.TitleHighlight>
        <S.TitleNormal>{"Let's Sign up Your Profile"}</S.TitleNormal>
      </S.TitleRow>

      <S.FormWrap onSubmit={handleSubmit} noValidate>
        <S.FieldWrap>
          <S.Label htmlFor="companyName">Company Name</S.Label>

          <S.CompanyInput
            id="companyName"
            name="companyName"
            placeholder="Google"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            autoFocus
            aria-describedby={errorId}
            aria-invalid={showError || undefined}
          />

          {showError ? (
            <S.ErrorText id={errorId} role="alert">
              Company name is required
            </S.ErrorText>
          ) : null}
        </S.FieldWrap>

        <S.NextButton type="submit" variant="contained" color="primary" disabled={!isValid}>
          <Typography component="span" variant="h6">
            Next
          </Typography>
        </S.NextButton>
      </S.FormWrap>
    </S.Wrapper>
  );
}
