import React from 'react';

import { StyledNavBox, StyledNavButton } from './EventManagement.styles';

export type ActiveTab = 'interactive' | 'raffle';

interface EventTabsProps {
  activeTab: ActiveTab;
  onInteractiveClick: () => void;
  onRaffleClick: () => void;
}

/**
 * Event tabs component for switching between Interactive and Raffle modes
 */
export default function EventTabs({
  activeTab,
  onInteractiveClick,
  onRaffleClick,
}: EventTabsProps) {
  return (
    <StyledNavBox>
      <StyledNavButton
        variant={activeTab === 'interactive' ? 'contained' : 'outlined'}
        startIcon={<span>💡</span>}
        onClick={onInteractiveClick}
      >
        Interactive Quiz
      </StyledNavButton>
      <StyledNavButton
        variant={activeTab === 'raffle' ? 'contained' : 'outlined'}
        startIcon={<span>🎰</span>}
        onClick={onRaffleClick}
      >
        Raffle Game
      </StyledNavButton>
    </StyledNavBox>
  );
}
