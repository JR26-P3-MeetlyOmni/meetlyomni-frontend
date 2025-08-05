import { StaticImageData } from 'next/image';

export interface FeatureCardData {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

export interface FeatureCardGridProps {
  data: FeatureCardData[];
  type: 'project' | 'product';
}
