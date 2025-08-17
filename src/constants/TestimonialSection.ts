import { TestimonialData } from '@/app/(main)/components/TestimonialsSection/types';

export const SAMPLE_TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    name: 'David L.',
    role: 'Business Training Supervisor, Salesforce',
    content:
      'Simple, smooth, and no downloads! Meetly Omni makes it easy to organize quiz competitions, increasing engagement and enhancing the overall experience.',
    avatarUrl: '/assets/images/TestimonialsSection/David_L.png',
  },
  {
    id: 2,
    name: 'Alex W.',
    role: 'Event Manager, Amazon',
    content:
      'Meetly Omni makes our annual corporate meeting more fun than ever! Interactive responses let the audience truly participate, making the atmosphere far more engaging.',
    avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
  },
  {
    id: 3,
    name: 'Sophie M.',
    role: 'Head of Brand Event Planning, Microsoft',
    content:
      'The sweepstakes feature is awesome! We used Meetly Omni to run interactive sweepstakes at our launch events, leading to a significant increase in audience engagement and retention.',
    avatarUrl: '/assets/images/TestimonialsSection/Sophie_M.png',
  },
];
export const TESTIMONIALS_DATA: Readonly<TestimonialData[]> = SAMPLE_TESTIMONIALS;

export const CARD_POSITIONS = ['left', 'center', 'right'] as const;
