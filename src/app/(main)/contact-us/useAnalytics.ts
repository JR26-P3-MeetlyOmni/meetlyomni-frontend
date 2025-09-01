import { analytics } from '@/lib/analytics';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    analytics?.page();
  }, [pathname]);

  const track = (event: string, props?: Record<string, unknown>) => analytics?.track(event, props);

  const identify = (userId: string, traits?: Record<string, unknown>) =>
    analytics?.identify(userId, traits);

  const reset = () => analytics?.reset();

  return { track, identify, reset };
};
