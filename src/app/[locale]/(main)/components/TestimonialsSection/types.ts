export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export interface TestimonialsSectionProps {
  data?: TestimonialData[];
}
