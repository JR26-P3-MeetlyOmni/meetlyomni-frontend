/**
 * Enhanced token storage with dual cookie strategy
 * - Access Token: httpOnly cookie (15 min) - for API authentication
 * - Refresh Token: httpOnly cookie (7 days) - for token refresh
 * - User Info: readable cookie - for frontend role/routing decisions
 */
export const tokenStorage = {
  load(): string | null {
    if (typeof window === 'undefined') {
      return null; 
    }

    try {
      const cookies = document.cookie.split(';');
      const userInfoCookie = cookies.find(cookie => 
        cookie.trim().startsWith('user_info=')
      );
      
      if (userInfoCookie) {
        return 'authenticated';
      }
      
      return null;
    } catch {
      return null;
    }
  },

  getUserInfo(): Record<string, unknown> | null {
    if (typeof window === 'undefined') return null;

    try {
      const cookies = document.cookie.split(';');
      const userInfoCookie = cookies.find(cookie => 
        cookie.trim().startsWith('user_info=')
      );
      
      if (userInfoCookie) {
        const cookieValue = userInfoCookie.split('=')[1];
        if (cookieValue) {
          const userInfo = JSON.parse(decodeURIComponent(cookieValue));
          return {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.fullName || userInfo.name,
            fullName: userInfo.fullName,
            role: userInfo.role,
            organizationId: userInfo.organizationId,
            organizationCode: userInfo.organizationCode,
            phoneNumber: userInfo.phoneNumber,
          };
        }
      }
      
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Save is handled server-side via login API
   * Server sets: access_token (httpOnly), refresh_token (httpOnly), auth_status (readable)
   */
  save(): void {
    // Token saving is handled by server-side Set-Cookie headers
    // Client doesn't need to do anything
  },

  async remove(): Promise<void> {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api'}/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
      if (typeof window !== 'undefined') {
        document.cookie = 'user_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'auth_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }
  },

  exists(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const cookies = document.cookie.split(';');
      return cookies.some(cookie => {
        const trimmed = cookie.trim();
        return trimmed.startsWith('user_info=');
      });
    } catch {
      return false;
    }
  },

  async refresh(): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5000/api'}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  },
};
