const STORAGE_KEY = 'auth_token';

/**
 * Token storage service with SSR-safe localStorage operations
 */
export const tokenStorage = {
  /**
   * Load token from localStorage
   */
  load(): string | null {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },

  /**
   * Save token to localStorage
   */
  save(token: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, token);
    } catch {
      // Handle storage errors silently
    }
  },

  /**
   * Remove token from localStorage
   */
  remove(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Handle storage errors silently
    }
  },

  /**
   * Check if token exists
   */
  exists(): boolean {
    return !!this.load();
  },
};
