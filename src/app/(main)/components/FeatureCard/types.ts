import { StaticImageData } from 'next/image';

export interface FeatureCardItem {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

export interface FeatureCardGridProps {
  data: ReadonlyArray<FeatureCardItem>;
  type: 'project' | 'product';
}
