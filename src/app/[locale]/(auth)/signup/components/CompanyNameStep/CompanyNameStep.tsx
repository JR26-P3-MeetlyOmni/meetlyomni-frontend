'use client';

import { useCallback, useState } from 'react';

import { Typography } from '@mui/material';

import * as S from './CompanyNameStep.style';

type Props = { onNext: (companyName: string) => void };

export default function CompanyNameStep({ onNext }: Props) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = value.trim().length > 0;
  const showError = touched && !isValid;

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
      const trimmed = value.trim();
      if (!trimmed) return;
      onNext(trimmed);
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
            placeholder="Google"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            autoFocus
          />

          {showError ? <S.ErrorText role="alert">Company name is required</S.ErrorText> : null}
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
