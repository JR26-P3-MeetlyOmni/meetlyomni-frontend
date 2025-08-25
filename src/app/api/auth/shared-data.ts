// Shared data storage for authentication APIs

// Mock user database
export const mockUsers = [
  { id: '1', email: 'user@example.com', name: 'John Doe' },
  { id: '2', email: 'admin@test.com', name: 'Admin User' },
  { id: '3', email: 'jane@demo.com', name: 'Jane Smith' },
];

// In-memory token storage (in a real app, use a database with TTL)
// Use globalThis to persist across HMR/module reloads in dev
type ResetTokenData = { email: string; createdAt: number };

declare global {
   
  var resetTokens: Map<string, ResetTokenData> | undefined;
}

export const resetTokens: Map<string, ResetTokenData> =
  globalThis.resetTokens ?? (globalThis.resetTokens = new Map<string, ResetTokenData>());

// Helper function to clean up expired tokens
export function cleanupExpiredTokens() {
  const now = Date.now();
  const FIFTEEN_MINUTES = 15 * 60 * 1000;

  for (const [token, data] of resetTokens) {
    if (now - data.createdAt > FIFTEEN_MINUTES) {
      resetTokens.delete(token);
    }
  }
}