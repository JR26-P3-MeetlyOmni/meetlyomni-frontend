'use client';

import React from 'react';

import { styled } from '@mui/material/styles';

interface StepDotsProps<T extends string> {
  steps: T[];
  activeStep: T;
  onStepChange: (step: T) => void;
  canGoToStep: (step: T) => boolean;
}

const DotsWrap = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: theme.spacing(6),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  zIndex: 10,
}));

const Dot = styled('button')<{ $active: boolean; $disabled: boolean }>(
  ({ theme, $active, $disabled }) => ({
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    border: 'none',
    padding: 0,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: $active ? '#1976d2' : theme.palette.grey[300],
    opacity: $disabled && !$active ? 0.6 : 1,
    transition: 'transform 150ms ease, background-color 150ms ease',
    '&:hover': {
      transform: $disabled ? 'none' : 'scale(1.15)',
    },
  }),
);

export default function StepDots<T extends string>({
  steps,
  activeStep,
  onStepChange,
  canGoToStep,
}: StepDotsProps<T>) {
  const activeIndex = steps.indexOf(activeStep);

  const stepHandlers = React.useMemo(() => {
    return steps.reduce(
      (handlers, step) => {
        handlers[step] = () => {
          const stepIndex = steps.indexOf(step);
          const isBackward = stepIndex <= activeIndex;
          const allowed = isBackward || canGoToStep(step);
          if (allowed) onStepChange(step);
        };
        return handlers;
      },
      {} as Record<T, () => void>,
    );
  }, [steps, activeIndex, canGoToStep, onStepChange]);

  return (
    <DotsWrap>
      {steps.map((step: T, idx: number) => {
        const isActive = idx === activeIndex;
        const isBackward = idx <= activeIndex;
        const allowed = isBackward || canGoToStep(step);

        return (
          <Dot
            key={step}
            $active={isActive}
            $disabled={!allowed}
            onClick={stepHandlers[step]}
            aria-label={`Go to ${step} step`}
            aria-disabled={!allowed}
          />
        );
      })}
    </DotsWrap>
  );
}
