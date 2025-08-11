export const URL_CONFIG = {
  privacy: process.env.NEXT_PUBLIC_PRIVACY_URL || 'https://jiangren.com.au/privacy-policy',
  terms: process.env.NEXT_PUBLIC_TERMS_URL || 'https://jiangren.com.au/terms-and-conditions',
  contact: process.env.NEXT_PUBLIC_CONTACT_URL || 'https://jiangren.com.au/contact',
  wechat: process.env.NEXT_PUBLIC_WECHAT_URL || 'https://jiangren.com.au/contact',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/school/jr-academy',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/jr_academy_au',
} as const;
