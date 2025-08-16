export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
}

export type CardPosition = 'left' | 'center' | 'right';

export interface TestimonialCardData extends TestimonialData {
  position: CardPosition;
}

export interface TestimonialCardProps {
  data: TestimonialCardData;
}

export interface TestimonialCardGridProps {
  data?: readonly TestimonialData[];
}
