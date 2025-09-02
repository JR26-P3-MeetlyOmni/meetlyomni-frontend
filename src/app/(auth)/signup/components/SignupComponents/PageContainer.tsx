'use client';

import * as React from 'react';

import { styled } from '@mui/material/styles';

import { BackButton } from './BackButton';
import { NextButton } from './NextButton';
import { PageTitle } from './PageLabel';
import { SmileyCard } from './SmileyCard';

type PageContainerProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
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
    paddingLeft: theme.spacing(20),
  },
}));

const Grid = styled('div')(({ theme }) => ({
  maxHeight: '70vh',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'start',
  marginTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(6),
  },
}));

const LeftStack = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: theme.spacing(78),
  width: '100%',
}));

const InputsStack = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ActionsRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(2),
  minHeight: 44,
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

  const handleFormSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!nextDisabled) onNext?.();
    },
    [onNext, nextDisabled],
  );

  return (
    <Root>
      <Grid>
        <LeftStack>
          <PageTitle title={title} subtitle={subtitle} />

          <form onSubmit={handleFormSubmit}>
            <InputsStack>{children}</InputsStack>

            <ActionsRow>
              <BackButton onClick={handleBack} />
              <NextButton onClick={handleNext} disabled={nextDisabled} />
            </ActionsRow>
          </form>
        </LeftStack>
        <SmileyCard />
      </Grid>
    </Root>
  );
}

export default PageContainer;
