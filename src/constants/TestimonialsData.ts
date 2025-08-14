import { TestimonialData } from '@/app/(main)/components/TestimonialsSection/types';

export const SAMPLE_TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    name: 'David L.',
    role: 'Business Training Supervisor, Salesforce',
    content:
      'Simple, smooth, and no download! Meetly Omni makes it easy to organize quiz competitions, increasing the interactivity of the event and enhancing the overall experience',
    avatarUrl: '/assets/images/TestimonialsSection/David_L.png',
  },
  {
    id: 2,
    name: 'Alex W.',
    role: 'Event Manager, Amazon',
    content:
      'Meetly Omni makes our annual corporate meeting more fun than ever! Interactive answers let the audience really participate in the activity atmosphere more active.',
    avatarUrl: '/assets/images/TestimonialsSection/Alex_W.png',
  },
  {
    id: 3,
    name: 'Sophie M.',
    role: 'Head of Brand Event Planning, Microsoft',
    content:
      'The sweeptakes feature awesome! We used Meetly Omni to conduct interactive sweeptakes at our launch events, which saw a significant increase in audience engagement and retention.',
    avatarUrl: '/assets/images/TestimonialsSection/Sophie_M.png',
  },
];
export const TESTIMONIALS_DATA: Readonly<TestimonialData[]> = SAMPLE_TESTIMONIALS;
