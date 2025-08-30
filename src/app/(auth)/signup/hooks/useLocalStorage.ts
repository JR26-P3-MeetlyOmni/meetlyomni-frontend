import React from 'react';

import { useClient } from './useClient';

// Custom hook for basic localStorage operations
function useBasicStorage(isClient: boolean) {
  const getItem = React.useCallback(
    (key: string) => {
      if (!isClient) return null;

      try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        // Try to parse as JSON first
        try {
          return JSON.parse(item);
        } catch {
          // If JSON parsing fails, return the raw string
          return item;
        }
      } catch {
        return null;
      }
    },
    [isClient],
  );

  const setItem = React.useCallback(
    (key: string, value: unknown) => {
      if (!isClient) return;

      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Silently handle localStorage errors
      }
    },
    [isClient],
  );

  const removeItem = React.useCallback(
    (key: string) => {
      if (!isClient) return;

      try {
        localStorage.removeItem(key);
      } catch {
        // Silently handle localStorage errors
      }
    },
    [isClient],
  );

  return { getItem, setItem, removeItem };
}

// Custom hook for cleanup operations
function useCleanup(isClient: boolean) {
  const cleanupOldData = React.useCallback(() => {
    if (!isClient) return;

    try {
      const raw = localStorage.getItem('signupCurrentStep');
      if (raw) {
        const trimmed = raw.trim();
        try {
          JSON.parse(trimmed);
          // valid JSON -> keep
        } catch {
          // old/plain format -> remove
          localStorage.removeItem('signupCurrentStep');
        }
      }
    } catch {
      // Silently handle cleanup errors
    }
  }, [isClient]);

  return { cleanupOldData };
}

/**
 * Hook for localStorage operations with error handling
 */
export function useLocalStorage() {
  const isClient = useClient();
  const { getItem, setItem, removeItem } = useBasicStorage(isClient);
  const { cleanupOldData } = useCleanup(isClient);

  return {
    getItem,
    setItem,
    removeItem,
    cleanupOldData,
    isClient,
  } as const;
}
