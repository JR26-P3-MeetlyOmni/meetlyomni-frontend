import { analytics, type ContactFormEvent, getTimestamp } from '@/lib/analytics';

import { useCallback } from 'react';

// Import FormData type for better integration
import type { FormData } from './type';

export const useAnalytics = () => {
  // Track contact form submission - simplified version
  const trackContactForm = useCallback(async (formData: FormData) => {
    if (analytics) {
      try {
        const eventData: ContactFormEvent = {
          ...formData,
          timestamp: getTimestamp(),
        };

        return await analytics.track('contactFormSubmitted', eventData);
      } catch (error) {
        // Silently handle errors to avoid affecting user experience
        throw error;
      }
    }

    // Return null when analytics is not available
    return null;
  }, []);

  return { trackContactForm };
};
