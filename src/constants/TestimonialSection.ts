import { TestimonialData } from '@/app/(main)/components/TestimonialsSection/types';
import { getAssetUrl } from '@/utils/cdn';

export const SAMPLE_TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    name: 'David L.',
    role: 'Business Training Supervisor, Salesforce',
    content:
      'Simple, smooth, and no downloads! Meetly Omni makes it easy to organize quiz competitions, increasing engagement and enhancing the overall experience.',
    avatarUrl: getAssetUrl('StaticFiles/assets/images/TestimonialsSection/David_L.png'),
  },
  {
    id: 2,
    name: 'Alex W.',
    role: 'Event Manager, Amazon',
    content:
      'Meetly Omni makes our annual corporate meeting more fun than ever! Interactive responses let the audience truly participate, making the atmosphere far more engaging.',
    avatarUrl: getAssetUrl('StaticFiles/assets/images/TestimonialsSection/Alex_W.png'),
  },
  {
    id: 3,
    name: 'Sophie M.',
    role: 'Head of Brand Event Planning, Microsoft',
    content:
      'The sweepstakes feature is awesome! We used Meetly Omni to run interactive sweepstakes at our launch events, leading to a significant increase in audience engagement and retention.',
    avatarUrl: getAssetUrl('StaticFiles/assets/images/TestimonialsSection/Sophie_M.png'),
  },
];
export const TESTIMONIALS_DATA: Readonly<TestimonialData[]> = SAMPLE_TESTIMONIALS;

export const CARD_POSITIONS = ['left', 'center', 'right'] as const;

export const TITLE = 'What do our users say?';

export const SUBTITLE =
  'Discover firsthand experiences shared by our valued customers. Hear their stories, and feedback that shed light on their journey with us.';
