'use client';

import * as React from 'react';

import { styled } from '@mui/material/styles';

import BackButton from './BackButton';
// import { ValidatedInput } from './FieldInput';
import NextButton from './NextButton';
import { PageTitle } from './PageLabel';
import { SmileyCard } from './SmileyCard';

type PageContainerProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode; // 放置 1-2 个 FieldInput
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
};

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    paddingLeft: theme.spacing(16),
  },
}));

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),
  alignItems: 'start',
  marginTop: theme.spacing(16),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(6),
  },
}));

const LeftStack = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: 0,
  gap: theme.spacing(3),
}));

const InputsStack = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2.5),
}));

const ActionsRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(12),
  minHeight: 44, // 与按钮高度一致，进一步稳定行高
}));

export function PageContainer({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextDisabled = false,
}: PageContainerProps) {
  const handleBack = React.useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleNext = React.useCallback(() => {
    if (!nextDisabled) onNext?.();
  }, [onNext, nextDisabled]);

  return (
    <Root>
      <Grid>
        <LeftStack>
          <PageTitle title={title} subtitle={subtitle} />

          <InputsStack>{children}</InputsStack>

          <ActionsRow>
            <BackButton onClick={handleBack} />
            <NextButton onClick={handleNext} disabled={nextDisabled} />
          </ActionsRow>
        </LeftStack>
        <SmileyCard />
      </Grid>
    </Root>
  );
}

export default PageContainer;
