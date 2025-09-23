/**
 * Animation configuration constants
 * Centralized configuration for transitions, transforms and animations
 */

export const ANIMATION_CONFIG = {
  // Transition durations
  TRANSITIONS: {
    fast: '0.15s',
    normal: '0.2s',
    slow: '0.3s',
  },

  // Common transition properties
  TRANSITION_PROPERTIES: {
    hoverEffect: 'background-color 0.2s, color 0.2s',
    transform: 'transform 0.2s',
    opacity: 'opacity 0.2s ease',
  },

  // Transform values
  TRANSFORMS: {
    rotate: {
      expanded: 'rotate(180deg)',
      collapsed: 'rotate(0deg)',
    },
  },

  // Easing functions
  EASING: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

export type AnimationConfig = typeof ANIMATION_CONFIG;
