import { AnalyticsBrowser } from '@segment/analytics-next';

// Check environment variables
const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

// Define tracking event types - only for form data
export interface ContactFormEvent {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
  timestamp: string;
}

// Create analytics instance
export const analytics = (() => {
  // Return null during server-side rendering
  if (typeof window === 'undefined') {
    return null;
  }

  // Return null if writeKey is not configured
  if (!writeKey || writeKey === 'your_segment_write_key_here') {
    // eslint-disable-next-line no-console
    console.warn('Segment Analytics: Write key not configured. Analytics will be disabled.');
    return null;
  }

  try {
    // Initialize Segment Analytics
    return AnalyticsBrowser.load({ writeKey });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Segment Analytics: Failed to initialize:', error);
    return null;
  }
})();

// Helper function: Get timestamp
export const getTimestamp = (): string => {
  return new Date().toISOString();
};
