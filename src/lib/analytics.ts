import { AnalyticsBrowser } from '@segment/analytics-next';

export const analytics =
  typeof window === 'undefined'
    ? null
    : AnalyticsBrowser.load({
        writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!,
      });
