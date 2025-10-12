import { getAssetUrl } from '@/utils/cdn';

/**
 * Avatar configuration constants
 * Centralized configuration for user avatar settings
 */

export const AVATAR_CONFIG = {
  // Default avatar image path
  DEFAULT_AVATAR: getAssetUrl('StaticFiles/assets/images/navbar/user_avatar.png'),

  // Avatar dimensions
  DIMENSIONS: {
    width: 40,
    height: 40,
  },

  // Alt text for accessibility
  ALT_TEXT: 'User Avatar',
} as const;

export type AvatarConfig = typeof AVATAR_CONFIG;
