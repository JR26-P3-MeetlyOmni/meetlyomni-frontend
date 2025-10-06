// src/app/dashboard/events/components/eventMocks.ts
export type EventItem = {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  creator: {
    name: string;
    avatarUrl?: string;
  };
  playCount: number;
  isDraft?: boolean;
  createdAt: string;
};

export type NewEventInput = {
  title: string;
  description?: string;
  coverImageUrl?: string;
  isDraft?: boolean;
  creatorName?: string;
  creatorAvatarUrl?: string;
};

export const COVER_PLACEHOLDER = '/assets/images/FeatureImages/data_visualization.webp';
export const AVATAR_PLACEHOLDER = '/assets/images/navbar/user_avatar.png';

const nowIso = () => new Date().toISOString();

export const buildMockEvent = (input: NewEventInput): EventItem => ({
  id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
  title: input.title || 'Untitled event',
  description: input.description || 'Lots of fun games and prizes waiting for you',
  coverImageUrl: input.coverImageUrl,
  creator: {
    name: input.creatorName || 'Alex Li',
    avatarUrl: input.creatorAvatarUrl,
  },
  playCount: 0,
  isDraft: !!input.isDraft,
  createdAt: nowIso(),
});

export const initialMockEvents: EventItem[] = [
  {
    id: 'e_001',
    title: 'Brisbane offline quiz event',
    description: 'Lots of fun games and prizes waiting for you',
    coverImageUrl: '/assets/images/FeatureImages/data_analysis.webp',
    creator: { name: 'Alex Li', avatarUrl: '/assets/images/navbar/user_avatar.png' },
    playCount: 5,
    isDraft: false,
    createdAt: nowIso(),
  },
  {
    id: 'e_002',
    title: 'Sydney offline quiz event',
    description: 'Lots of fun games and prizes waiting for you',
    coverImageUrl: '/assets/images/FeatureImages/game_interaction.webp',
    creator: { name: 'Alex Li', avatarUrl: '/assets/images/navbar/user_avatar.png' },
    playCount: 2,
    isDraft: false,
    createdAt: nowIso(),
  },
  {
    id: 'e_003',
    title: 'Sydney offline quiz event',
    description: 'Lots of fun games and prizes waiting for you',
    creator: { name: 'Alex Li' },
    playCount: 2,
    isDraft: true,
    createdAt: nowIso(),
  },
];
