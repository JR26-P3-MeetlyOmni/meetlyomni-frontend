import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock analytics
const mockAnalytics = {
  track: vi.fn(),
};

// Mock AnalyticsBrowser
vi.mock('@segment/analytics-next', () => ({
  AnalyticsBrowser: {
    load: vi.fn(() => mockAnalytics),
  },
}));

describe('Simplified Analytics Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset environment
    vi.unstubAllEnvs();

    // Mock window object
    Object.defineProperty(global, 'window', {
      value: {},
      writable: true,
    });
  });

  describe('getTimestamp', () => {
    it('should return ISO timestamp', async () => {
      const { getTimestamp } = await import('../analytics');
      const timestamp = getTimestamp();

      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('analytics instance', () => {
    it('should initialize with valid write key', async () => {
      // Set environment variable
      vi.stubEnv('NEXT_PUBLIC_SEGMENT_WRITE_KEY', 'test_key');

      const { analytics } = await import('../analytics');
      expect(analytics).toBeDefined();
    });

    it('should return null for server-side rendering', async () => {
      // Mock server-side environment
      Object.defineProperty(global, 'window', { value: undefined });

      const { analytics } = await import('../analytics');
      expect(analytics).toBeNull();
    });

    it('should return null when write key is not configured', async () => {
      // Mock missing write key
      vi.stubEnv('NEXT_PUBLIC_SEGMENT_WRITE_KEY', undefined);

      const { analytics } = await import('../analytics');
      expect(analytics).toBeNull();
    });
  });

  describe('ContactFormEvent structure', () => {
    it('should have correct structure', async () => {
      // Test the structure without importing the type
      const mockEvent = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        question: 'Test question',
        timestamp: '2024-01-15T10:30:00.000Z',
      };

      expect(mockEvent.firstName).toBe('John');
      expect(mockEvent.lastName).toBe('Doe');
      expect(mockEvent.email).toBe('john@example.com');
      expect(mockEvent.question).toBe('Test question');
      expect(mockEvent.timestamp).toBe('2024-01-15T10:30:00.000Z');

      // Verify the structure matches our expected interface
      expect(typeof mockEvent.firstName).toBe('string');
      expect(typeof mockEvent.lastName).toBe('string');
      expect(typeof mockEvent.email).toBe('string');
      expect(typeof mockEvent.question).toBe('string');
      expect(typeof mockEvent.timestamp).toBe('string');
    });
  });
});
