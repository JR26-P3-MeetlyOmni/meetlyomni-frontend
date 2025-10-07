export interface FeatureCardItem {
  imageUrl: string;
  title: string;
  description: string;
}

export interface FeatureCardGridProps {
  data: ReadonlyArray<FeatureCardItem>;
  type: 'project' | 'product';
}
