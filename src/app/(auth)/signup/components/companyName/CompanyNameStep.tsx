// /home/lukelyu/p3/meetlyomni-frontend/src/app/(auth)/signup/components/companyName/CompanyNameStep.tsx
'use client';

import React, { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';

import { Typography } from '@mui/material';

import * as S from './CompanyNameStep.style';

// /home/lukelyu/p3/meetlyomni-frontend/src/app/(auth)/signup/components/companyName/CompanyNameStep.tsx

type Props = { onNext: (companyName: string) => void };

export default function CompanyNameStep({ onNext }: Props) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = value.trim();
  const isValid = trimmed.length > 0;
  const showError = touched && !isValid;
  const errorId = showError ? 'companyName-error' : undefined;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTouched(true);
      if (!trimmed) return;
      onNext(trimmed);
    },
    [onNext, trimmed],
  );

  return (
    <S.Wrapper>
      <S.TitleRow>
        <S.TitleHighlight>Welcome to Omni!</S.TitleHighlight>
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
            autoComplete="off"
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
