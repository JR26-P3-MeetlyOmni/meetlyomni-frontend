import React from 'react';

/**
 * Hook to detect if we're on the client side
 * Useful for avoiding hydration mismatches
 */
export function useClient() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
