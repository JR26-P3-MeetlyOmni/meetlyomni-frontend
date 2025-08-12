import { StaticImageData } from 'next/image';

export interface FeatureCardItem {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

export interface IFeatureCardGridProps {
  features: ProductFeature[] | ProjectFeature[];
  type: 'product' | 'project';
}
