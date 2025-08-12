export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export interface AnimatedTestimonialData extends TestimonialData {
  position: 'left' | 'center' | 'right';
}

export interface AnimatedTestimonialCardProps {
  animatedTestimonial: AnimatedTestimonialData;
}

export interface TestimonialsSectionProps {
  data?: TestimonialData[];
}
